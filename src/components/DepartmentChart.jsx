import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DepartmentChart({ data }) {
  const chartData = useMemo(() => {
    const deptMap = {};
    data.forEach(e => {
      if (!deptMap[e.department]) deptMap[e.department] = { total: 0, count: 0 };
      deptMap[e.department].total += e.salary;
      deptMap[e.department].count++;
    });
    return Object.entries(deptMap)
      .map(([dept, { total, count }]) => ({
        department: dept,
        avgSalary: Math.round(total / count),
      }))
      .sort((a, b) => b.avgSalary - a.avgSalary);
  }, [data]);

  return (
    <div className="chart-card">
      <h3>Average Salary by Department</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="department" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip formatter={v => [`$${v.toLocaleString()}`, 'Avg Salary']} />
          <Bar dataKey="avgSalary" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
