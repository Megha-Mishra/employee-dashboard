import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PerformanceChart({ data }) {
  const chartData = useMemo(() => {
    const deptMap = {};
    data.forEach(e => {
      if (!deptMap[e.department]) deptMap[e.department] = { total: 0, count: 0 };
      deptMap[e.department].total += e.performanceRating;
      deptMap[e.department].count++;
    });
    return Object.entries(deptMap)
      .map(([dept, { total, count }]) => ({
        department: dept,
        avgRating: parseFloat((total / count).toFixed(2)),
      }))
      .sort((a, b) => b.avgRating - a.avgRating);
  }, [data]);

  return (
    <div className="chart-card">
      <h3>Avg Performance by Department</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="department" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
          <Tooltip formatter={v => [v.toFixed(2), 'Avg Rating']} />
          <Bar dataKey="avgRating" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
