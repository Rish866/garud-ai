import ERPModulePage from "../components/erp/ERPModulePage";
import { complianceModules } from "../lib/erpModuleConfigs";

export default function TyreManagementPage() {
  return <ERPModulePage config={complianceModules["tyre-management"]} />;
}
