import ERPModulePage from "../components/erp/ERPModulePage";
import { erpModules } from "../lib/erpModuleConfigs";

export default function DriversPage() {
  return <ERPModulePage config={erpModules.drivers} />;
}
