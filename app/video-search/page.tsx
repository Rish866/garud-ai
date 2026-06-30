import ERPModulePage from "../components/erp/ERPModulePage";
import { safetyModules } from "../lib/erpModuleConfigs";

export default function VideoSearchPage() {
  return <ERPModulePage config={safetyModules["video-search"]} />;
}
