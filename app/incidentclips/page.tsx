import ERPModulePage from "../components/erp/ERPModulePage";
import { safetyModules } from "../lib/erpModuleConfigs";

export default function IncidentClipsPage() {
  return <ERPModulePage config={safetyModules.incidentclips} />;
}
