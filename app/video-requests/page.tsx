import ERPModulePage from "../components/erp/ERPModulePage";
import { safetyModules } from "../lib/erpModuleConfigs";

export default function VideoRequestsPage() {
  return <ERPModulePage config={safetyModules["video-requests"]} />;
}
