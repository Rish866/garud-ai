import ERPModulePage from "../components/erp/ERPModulePage";
import { financeModules } from "../lib/erpModuleConfigs";

export default function PaymentsPage() {
  return <ERPModulePage config={financeModules.payments} />;
}
