import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

function money(value: number) {
  return `INR ${Math.round(value || 0).toLocaleString("en-IN")}`;
}

export default async function InventoryManagementPage() {
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { data } = await filterByTenant(
    supabase.from("erp_inventory_items").select("*").order("item_name"),
    tenantId,
  );
  const items = data || [];
  const stockValue = items.reduce(
    (sum, item) => sum + Number(item.current_stock || 0) * Number(item.purchase_rate || 0),
    0,
  );
  const lowStock = items.filter(
    (item) => Number(item.current_stock || 0) <= Number(item.reorder_level || 0),
  );
  const rows = items.map((item) => [
    item.item_name || "-",
    item.category || "-",
    item.current_stock || 0,
    item.unit || "-",
    money(Number(item.purchase_rate || 0)),
    money(Number(item.selling_rate || 0)),
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Cement and material stock
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Inventory Management
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Manage cement, steel, sand, aggregate, bricks, and construction
            material stock across shops and godowns from one online window.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Items", String(items.length), "Stock masters"],
            ["Stock value", money(stockValue), "At purchase rate"],
            ["Low stock", String(lowStock.length), "At or below reorder"],
            ["Locations", String(new Set(items.map((item) => item.location).filter(Boolean)).size), "Shops/godowns"],
          ].map(([label, value, hint]) => (
            <div key={label} className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-sm text-slate-400">{label}</p>
              <h2 className="mt-3 text-3xl font-black text-white">{value}</h2>
              <p className="mt-2 text-sm text-slate-500">{hint}</p>
            </div>
          ))}
        </section>

        <ModuleActions
          moduleTitle="Inventory Management"
          moduleKey="erp_inventory_items"
          columns={["Item", "Category", "Stock", "Unit", "Purchase Rate", "Selling Rate"]}
          rows={rows}
          reports={["Stock summary", "Low stock", "Godown wise inventory", "Rate list"]}
        />

        <DatabaseWorkbench
          title="Inventory Item"
          table="erp_inventory_items"
          initialRows={items}
          fields={[
            { key: "item_name", label: "Item Name", required: true },
            { key: "sku", label: "SKU / Code" },
            { key: "category", label: "Category", type: "select", options: ["Cement", "Steel", "Sand", "Aggregate", "Bricks", "Blocks", "Other"] },
            { key: "unit", label: "Unit", type: "select", options: ["bag", "ton", "brass", "kg", "piece", "truck", "other"], required: true },
            { key: "opening_stock", label: "Opening Stock", type: "number" },
            { key: "current_stock", label: "Current Stock", type: "number", required: true },
            { key: "purchase_rate", label: "Purchase Rate", type: "number" },
            { key: "selling_rate", label: "Selling Rate", type: "number" },
            { key: "reorder_level", label: "Reorder Level", type: "number" },
            { key: "location", label: "Shop / Godown" },
            { key: "status", label: "Status", type: "select", options: ["active", "inactive"], required: true },
          ]}
        />
      </div>
    </AppLayout>
  );
}
