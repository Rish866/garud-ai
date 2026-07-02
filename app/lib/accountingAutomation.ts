const ACCOUNTING_TABLE = "erp_accounting_entries";
const STOCK_MOVEMENT_TABLE = "erp_stock_movements";
const LEDGER_POSTING_TABLE = "erp_ledger_postings";

type SupabaseAdmin = any;
type AccountingEntry = Record<string, any>;

function numberValue(value: unknown) {
  const number = Number(value || 0);
  return Number.isFinite(number) ? number : 0;
}

function entryType(entry: AccountingEntry) {
  return String(entry.entry_type || "").trim();
}

function isPurchase(entry: AccountingEntry) {
  return entryType(entry).startsWith("Purchase");
}

function isSale(entry: AccountingEntry) {
  return entryType(entry).startsWith("Sales");
}

function stockDelta(entry: AccountingEntry) {
  const quantity = numberValue(entry.quantity);
  if (!entry.item_name || quantity === 0) return 0;
  if (isPurchase(entry)) return quantity;
  if (isSale(entry)) return -quantity;
  return 0;
}

function ledgerLines(entry: AccountingEntry) {
  const type = entryType(entry);
  const amount = numberValue(entry.amount);
  const party = entry.party_name || "Party Ledger";
  const ledger = entry.ledger_name || type;

  if (!amount) return [];

  if (type === "Purchase - Cash") {
    return [
      { ledger_name: "Purchase", debit: amount, credit: 0 },
      { ledger_name: "Cash", debit: 0, credit: amount },
    ];
  }

  if (type === "Purchase - Credit") {
    return [
      { ledger_name: "Purchase", debit: amount, credit: 0 },
      { ledger_name: party, debit: 0, credit: amount },
    ];
  }

  if (type === "Sales - Cash") {
    return [
      { ledger_name: "Cash", debit: amount, credit: 0 },
      { ledger_name: "Sales", debit: 0, credit: amount },
    ];
  }

  if (type === "Sales - Credit") {
    return [
      { ledger_name: party, debit: amount, credit: 0 },
      { ledger_name: "Sales", debit: 0, credit: amount },
    ];
  }

  if (type === "Bank Payment") {
    return [
      { ledger_name: ledger, debit: amount, credit: 0 },
      { ledger_name: entry.bank_name || "Bank", debit: 0, credit: amount },
    ];
  }

  if (type === "Bank Receipt") {
    return [
      { ledger_name: entry.bank_name || "Bank", debit: amount, credit: 0 },
      { ledger_name: ledger, debit: 0, credit: amount },
    ];
  }

  if (type === "Cash Payment" || type === "Expense - Cash") {
    return [
      { ledger_name: ledger, debit: amount, credit: 0 },
      { ledger_name: "Cash", debit: 0, credit: amount },
    ];
  }

  if (type === "Cash Receipt") {
    return [
      { ledger_name: "Cash", debit: amount, credit: 0 },
      { ledger_name: ledger, debit: 0, credit: amount },
    ];
  }

  if (type === "Expense - Bank") {
    return [
      { ledger_name: ledger, debit: amount, credit: 0 },
      { ledger_name: entry.bank_name || "Bank", debit: 0, credit: amount },
    ];
  }

  return [];
}

async function findInventoryItem(
  supabase: SupabaseAdmin,
  tenantId: string | null,
  itemName: string,
) {
  let query = supabase
    .from("erp_inventory_items")
    .select("*")
    .ilike("item_name", itemName)
    .limit(1);

  if (tenantId) query = query.eq("tenant_id", tenantId);

  const { data, error } = await query.maybeSingle();
  if (error) return null;
  return data || null;
}

async function applyStockDelta(
  supabase: SupabaseAdmin,
  entry: AccountingEntry,
  tenantId: string | null,
  direction: 1 | -1,
) {
  const delta = stockDelta(entry) * direction;
  if (!delta || !entry.item_name) return;

  const item = await findInventoryItem(supabase, tenantId, String(entry.item_name));
  const nextStock = item
    ? numberValue(item.current_stock) + delta
    : 0;

  if (item) {
    await supabase
      .from("erp_inventory_items")
      .update({ current_stock: nextStock })
      .eq("id", item.id);
  }

  await supabase.from(STOCK_MOVEMENT_TABLE).insert({
    tenant_id: tenantId,
    accounting_entry_id: entry.id,
    inventory_item_id: item?.id || null,
    item_name: entry.item_name,
    movement_type: delta > 0 ? "in" : "out",
    quantity: Math.abs(delta),
    unit: entry.unit || item?.unit || null,
    rate: numberValue(entry.rate),
    amount: numberValue(entry.amount),
    stock_after: item ? nextStock : null,
    source_type: entryType(entry),
    notes: item ? null : "Inventory item not found; stock was not adjusted.",
  });
}

async function recreateLedgerPostings(
  supabase: SupabaseAdmin,
  entry: AccountingEntry,
  tenantId: string | null,
) {
  await supabase
    .from(LEDGER_POSTING_TABLE)
    .delete()
    .eq("accounting_entry_id", entry.id);

  const lines = ledgerLines(entry).map((line) => ({
    tenant_id: tenantId,
    accounting_entry_id: entry.id,
    entry_date: entry.entry_date,
    voucher_no: entry.voucher_no || null,
    entry_type: entryType(entry),
    party_name: entry.party_name || null,
    ...line,
  }));

  if (lines.length) {
    await supabase.from(LEDGER_POSTING_TABLE).insert(lines);
  }
}

async function removeAutomationRows(supabase: SupabaseAdmin, entryId: string) {
  await supabase
    .from(STOCK_MOVEMENT_TABLE)
    .delete()
    .eq("accounting_entry_id", entryId);
  await supabase
    .from(LEDGER_POSTING_TABLE)
    .delete()
    .eq("accounting_entry_id", entryId);
}

export async function afterAccountingCreate(
  supabase: SupabaseAdmin,
  entry: AccountingEntry,
  tenantId: string | null,
) {
  try {
    await applyStockDelta(supabase, entry, tenantId, 1);
    await recreateLedgerPostings(supabase, entry, tenantId);
  } catch {
    // Voucher save should not fail if automation tables are not migrated yet.
  }
}

export async function beforeAccountingUpdate(
  supabase: SupabaseAdmin,
  previousEntry: AccountingEntry | null,
  tenantId: string | null,
) {
  if (!previousEntry) return;
  try {
    await applyStockDelta(supabase, previousEntry, tenantId, -1);
    await removeAutomationRows(supabase, previousEntry.id);
  } catch {
    // Keep the main edit path available even if automation is not ready.
  }
}

export async function afterAccountingUpdate(
  supabase: SupabaseAdmin,
  entry: AccountingEntry,
  tenantId: string | null,
) {
  await afterAccountingCreate(supabase, entry, tenantId);
}

export async function beforeAccountingDelete(
  supabase: SupabaseAdmin,
  previousEntry: AccountingEntry | null,
  tenantId: string | null,
) {
  await beforeAccountingUpdate(supabase, previousEntry, tenantId);
}

export function isAccountingTable(table: string) {
  return table === ACCOUNTING_TABLE;
}
