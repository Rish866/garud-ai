import ERPModulePage from "../components/erp/ERPModulePage";
import { financeModules } from "../lib/erpModuleConfigs";

export default function DriverSalaryPage() {
  return <ERPModulePage config={financeModules["driver-salary"]} />;
}
