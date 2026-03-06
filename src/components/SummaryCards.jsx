import { useMemo } from 'react';

export default function SummaryCards({ data }) {
  const stats = useMemo(() => {
    const active = data.filter(e => e.isActive);
    const totalEmployees = data.length;
    const activeEmployees = active.length;
    const avgSalary = data.reduce((sum, e) => sum + e.salary, 0) / totalEmployees;
    const avgRating = data.reduce((sum, e) => sum + e.performanceRating, 0) / totalEmployees;
    const departments = [...new Set(data.map(e => e.department))].length;
    const totalProjects = data.reduce((sum, e) => sum + e.projectsCompleted, 0);

    return { totalEmployees, activeEmployees, avgSalary, avgRating, departments, totalProjects };
  }, [data]);

  const cards = [
    { label: 'Total Employees', value: stats.totalEmployees, sub: `${stats.activeEmployees} active`, color: '#3b82f6' },
    { label: 'Avg. Salary', value: `$${Math.round(stats.avgSalary).toLocaleString()}`, sub: 'per employee', color: '#10b981' },
    { label: 'Avg. Performance', value: stats.avgRating.toFixed(1), sub: 'out of 5.0', color: '#f59e0b' },
    { label: 'Departments', value: stats.departments, sub: `${stats.totalProjects} total projects`, color: '#8b5cf6' },
  ];

  return (
    <div className="summary-cards">
      {cards.map(card => (
        <div key={card.label} className="summary-card">
          <div className="card-accent" style={{ backgroundColor: card.color }} />
          <div className="card-content">
            <span className="card-label">{card.label}</span>
            <span className="card-value">{card.value}</span>
            <span className="card-sub">{card.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
