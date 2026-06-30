import ERPModulePage from "../components/erp/ERPModulePage";
import { complianceModules } from "../lib/erpModuleConfigs";

export default function DocumentCenterPage() {
  return <ERPModulePage config={complianceModules["document-center"]} />;
}
