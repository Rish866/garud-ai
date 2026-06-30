import ERPModulePage from "../components/erp/ERPModulePage";
import { complianceModules } from "../lib/erpModuleConfigs";

export default function DocumentAlertsPage() {
  return <ERPModulePage config={complianceModules["document-alerts"]} />;
}
