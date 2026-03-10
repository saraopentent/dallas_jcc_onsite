import { useState, useCallback } from 'react';
import SystemsMap from './components/SystemsMap';
import FilterBar from './components/FilterBar';
import DetailPanel from './components/DetailPanel';

export default function App() {
  const [view, setView] = useState('department');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showPotentialIntegrations, setShowPotentialIntegrations] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState(null);

  const filters = {
    search: searchQuery,
    department: selectedDepartment,
    showPotentialIntegrations,
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      {/* Title Bar */}
      <div style={{
        padding: '12px 20px',
        background: '#2B26A5',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', fontFamily: "'Petrona', Georgia, serif" }}>
            JCC Dallas — Systems Map
          </h1>
          <span style={{ fontSize: 11, color: '#D7D6EF' }}>
            On-Site Discovery Jan 2026
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        view={view}
        onViewChange={setView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        showPotentialIntegrations={showPotentialIntegrations}
        onTogglePotentialIntegrations={() => setShowPotentialIntegrations(prev => !prev)}
      />

      {/* Map + Detail Panel */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        <SystemsMap
          view={view}
          filters={filters}
          onNodeSelect={setSelectedSystem}
        />
        <DetailPanel
          system={selectedSystem}
          onClose={() => setSelectedSystem(null)}
        />
      </div>
    </div>
  );
}
