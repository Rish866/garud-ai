import ERPModulePage from "../components/erp/ERPModulePage";
import { safetyModules } from "../lib/erpModuleConfigs";

export default function DriverScorePage() {
  return <ERPModulePage config={safetyModules["driver-score"]} />;
}
