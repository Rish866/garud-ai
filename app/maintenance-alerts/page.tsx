import ERPModulePage from "../components/erp/ERPModulePage";
import { complianceModules } from "../lib/erpModuleConfigs";

export default function MaintenanceAlertsPage() {
  return <ERPModulePage config={complianceModules["maintenance-alerts"]} />;
}
