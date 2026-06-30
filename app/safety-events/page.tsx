import ERPModulePage from "../components/erp/ERPModulePage";
import { safetyModules } from "../lib/erpModuleConfigs";

export default function SafetyEventsPage() {
  return <ERPModulePage config={safetyModules["safety-events"]} />;
}
