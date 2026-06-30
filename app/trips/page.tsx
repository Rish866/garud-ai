import ERPModulePage from "../components/erp/ERPModulePage";
import { erpModules } from "../lib/erpModuleConfigs";

export default function TripsPage() {
  return <ERPModulePage config={erpModules.trips} />;
}
