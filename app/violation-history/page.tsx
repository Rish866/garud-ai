import ERPModulePage from "../components/erp/ERPModulePage";
import { safetyModules } from "../lib/erpModuleConfigs";

export default function ViolationHistoryPage() {
  return <ERPModulePage config={safetyModules["violation-history"]} />;
}
