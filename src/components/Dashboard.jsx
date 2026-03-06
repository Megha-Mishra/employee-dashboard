import employees from '../data/employees.json';
import SummaryCards from './SummaryCards';
import DepartmentChart from './DepartmentChart';
import PerformanceChart from './PerformanceChart';
import EmployeeGrid from './EmployeeGrid';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Employee Dashboard</h1>
          <p>Overview of company workforce and performance metrics</p>
        </div>
      </header>

      <SummaryCards data={employees} />

      <div className="charts-row">
        <DepartmentChart data={employees} />
        <PerformanceChart data={employees} />
      </div>

      <EmployeeGrid data={employees} />
    </div>
  );
}
