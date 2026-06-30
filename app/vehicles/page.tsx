import ERPModulePage from "../components/erp/ERPModulePage";
import { erpModules } from "../lib/erpModuleConfigs";

export default function VehiclesPage() {
  return <ERPModulePage config={erpModules.vehicles} />;
}
