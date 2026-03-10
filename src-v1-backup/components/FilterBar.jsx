import { departments } from '../data/boardData';

export default function FilterBar({
  view,
  onViewChange,
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  showPotentialIntegrations,
  onTogglePotentialIntegrations,
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 16px',
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      flexWrap: 'wrap',
      zIndex: 40,
    }}>
      {/* View Toggle */}
      <div style={{
        display: 'flex',
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
      }}>
        <ToggleButton
          active={view === 'department'}
          onClick={() => onViewChange('department')}
          label="By Department"
        />
        <ToggleButton
          active={view === 'system'}
          onClick={() => onViewChange('system')}
          label="By System"
        />
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 24, background: '#e2e8f0' }} />

      {/* Search */}
      <input
        type="text"
        placeholder="Search systems, features, notes..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          padding: '6px 12px',
          border: '1px solid #e2e8f0',
          borderRadius: 8,
          fontSize: 13,
          width: 220,
          outline: 'none',
          background: '#f8fafc',
        }}
      />

      {/* Department Filter */}
      <select
        value={selectedDepartment}
        onChange={(e) => onDepartmentChange(e.target.value)}
        style={{
          padding: '6px 10px',
          border: '1px solid #e2e8f0',
          borderRadius: 8,
          fontSize: 13,
          background: '#f8fafc',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        <option value="">All Departments</option>
        {departments.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      {/* Divider */}
      <div style={{ width: 1, height: 24, background: '#e2e8f0' }} />

      {/* Potential Integrations Toggle */}
      <button
        onClick={onTogglePotentialIntegrations}
        style={{
          padding: '4px 10px',
          borderRadius: 16,
          border: `1px solid ${showPotentialIntegrations ? '#3A7182' : '#e2e8f0'}`,
          background: showPotentialIntegrations ? '#3A718215' : '#ffffff',
          color: showPotentialIntegrations ? '#3A7182' : '#64748b',
          fontSize: 11,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
      >
        {showPotentialIntegrations ? 'Hide' : 'Show'} Potential Integrations
      </button>
    </div>
  );
}

function ToggleButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '5px 12px',
        fontSize: 12,
        fontWeight: active ? 600 : 400,
        background: active ? '#2B26A5' : '#ffffff',
        color: active ? '#ffffff' : '#64748b',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      {label}
    </button>
  );
}
