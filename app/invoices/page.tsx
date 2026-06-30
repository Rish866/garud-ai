import ERPModulePage from "../components/erp/ERPModulePage";
import { financeModules } from "../lib/erpModuleConfigs";

export default function InvoicesPage() {
  return <ERPModulePage config={financeModules.invoices} />;
}
