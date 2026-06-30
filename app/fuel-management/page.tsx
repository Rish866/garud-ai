import ERPModulePage from "../components/erp/ERPModulePage";
import { financeModules } from "../lib/erpModuleConfigs";

export default function FuelManagementPage() {
  return <ERPModulePage config={financeModules["fuel-management"]} />;
}
