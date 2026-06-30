import ERPModulePage from "../components/erp/ERPModulePage";
import { complianceModules } from "../lib/erpModuleConfigs";

export default function MaintenanceCenterPage() {
  return <ERPModulePage config={complianceModules["maintenance-center"]} />;
}
