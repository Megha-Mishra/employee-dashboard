import { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function EmployeeGrid({ data }) {
  const [quickFilter, setQuickFilter] = useState('');

  const columnDefs = useMemo(() => [
    {
      headerName: 'Name',
      valueGetter: p => `${p.data.firstName} ${p.data.lastName}`,
      filter: 'agTextColumnFilter',
      minWidth: 160,
    },
    {
      field: 'email',
      headerName: 'Email',
      filter: 'agTextColumnFilter',
      minWidth: 220,
    },
    {
      field: 'department',
      headerName: 'Department',
      filter: 'agTextColumnFilter',
      minWidth: 130,
    },
    {
      field: 'position',
      headerName: 'Position',
      filter: 'agTextColumnFilter',
      minWidth: 180,
    },
    {
      field: 'salary',
      headerName: 'Salary',
      filter: 'agNumberColumnFilter',
      minWidth: 120,
      valueFormatter: p => `$${p.value.toLocaleString()}`,
    },
    {
      field: 'hireDate',
      headerName: 'Hire Date',
      filter: 'agDateColumnFilter',
      minWidth: 120,
      valueFormatter: p => new Date(p.value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    },
    {
      field: 'age',
      headerName: 'Age',
      filter: 'agNumberColumnFilter',
      minWidth: 80,
    },
    {
      field: 'location',
      headerName: 'Location',
      filter: 'agTextColumnFilter',
      minWidth: 120,
    },
    {
      field: 'performanceRating',
      headerName: 'Rating',
      filter: 'agNumberColumnFilter',
      minWidth: 130,
      cellRenderer: p => {
        const val = p.value;
        const pct = (val / 5) * 100;
        const color = val >= 4.5 ? '#10b981' : val >= 4.0 ? '#3b82f6' : '#f59e0b';
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 4 }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color }}>{val}</span>
          </div>
        );
      },
    },
    {
      field: 'projectsCompleted',
      headerName: 'Projects',
      filter: 'agNumberColumnFilter',
      minWidth: 100,
    },
    {
      field: 'isActive',
      headerName: 'Status',
      minWidth: 110,
      cellRenderer: p => (
        <span className={`status-badge ${p.value ? 'active' : 'inactive'}`}>
          {p.value ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      field: 'skills',
      headerName: 'Skills',
      filter: 'agTextColumnFilter',
      minWidth: 260,
      cellRenderer: p => (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', padding: '2px 0' }}>
          {p.value.map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      ),
      valueGetter: p => p.data.skills.join(', '),
    },
    {
      field: 'manager',
      headerName: 'Manager',
      filter: 'agTextColumnFilter',
      minWidth: 150,
      valueFormatter: p => p.value || '—',
    },
  ], []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
  }), []);

  const onFilterChange = useCallback((e) => {
    setQuickFilter(e.target.value);
  }, []);

  return (
    <div className="grid-section">
      <div className="grid-header">
        <h2>Employee Directory</h2>
        <div className="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search employees..."
            value={quickFilter}
            onChange={onFilterChange}
          />
        </div>
      </div>
      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilter}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[5, 10, 20]}
          rowSelection="multiple"
          animateRows={true}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
}
