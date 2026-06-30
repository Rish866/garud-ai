import ERPModulePage from "../components/erp/ERPModulePage";
import { erpModules } from "../lib/erpModuleConfigs";

export default function CustomersPage() {
  return <ERPModulePage config={erpModules.customers} />;
}
