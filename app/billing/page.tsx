import ERPModulePage from "../components/erp/ERPModulePage";
import { financeModules } from "../lib/erpModuleConfigs";

export default function BillingPage() {
  return <ERPModulePage config={financeModules.billing} />;
}
