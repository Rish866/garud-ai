import ERPModulePage from "../components/erp/ERPModulePage";
import { safetyModules } from "../lib/erpModuleConfigs";

export default function VideoArchivePage() {
  return <ERPModulePage config={safetyModules["video-archive"]} />;
}
