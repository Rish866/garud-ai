import ERPModulePage from "../components/erp/ERPModulePage";
import { erpModules } from "../lib/erpModuleConfigs";

export default function TripExpensesPage() {
  return <ERPModulePage config={erpModules["trip-expenses"]} />;
}
