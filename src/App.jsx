import { useState, useEffect, useRef, useCallback } from 'react';
import { systems as initialSystems, departments } from './data/boardData';

const deptMap = Object.fromEntries(departments.map(d => [d.id, d.name]));

function useNotesSync() {
  const [systemsData, setSystemsData] = useState(() =>
    initialSystems.map(s => ({ ...s, notes: [...s.notes] }))
  );
  const saveTimer = useRef(null);

  // Load saved notes on mount
  useEffect(() => {
    fetch('/api/notes')
      .then(r => r.json())
      .then(saved => {
        if (Object.keys(saved).length === 0) return;
        setSystemsData(prev =>
          prev.map(s => saved[s.id] ? { ...s, notes: saved[s.id] } : s)
        );
      })
      .catch(() => {});
  }, []);

  const saveNotes = useCallback((data) => {
    const overrides = {};
    for (const s of data) {
      overrides[s.id] = s.notes;
    }
    fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(overrides),
    }).catch(() => {});
  }, []);

  function handleNotesChange(systemId, newNotes) {
    setSystemsData(prev => {
      const next = prev.map(s => s.id === systemId ? { ...s, notes: newNotes } : s);
      // Debounced save
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => saveNotes(next), 500);
      return next;
    });
  }

  return { systemsData, handleNotesChange };
}

function NotesCell({ notes, onChange }) {
  return (
    <td style={td}>
      <textarea
        style={notesTextarea}
        value={notes.join('\n')}
        onChange={(e) => {
          const lines = e.target.value.split('\n');
          onChange(lines);
        }}
        rows={Math.max(2, notes.length)}
      />
    </td>
  );
}

function SoftwareView({ systemsData, onNotesChange }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th style={{ ...th, width: '15%' }}>Software</th>
          <th style={{ ...th, width: '15%' }}>Function</th>
          <th style={{ ...th, width: '15%' }}>Department</th>
          <th style={{ ...th, width: '55%' }}>Notes</th>
        </tr>
      </thead>
      <tbody>
        {systemsData.map(sys => (
          <tr key={sys.id}>
            <td style={td}>
              <span style={{ fontWeight: 600 }}>{sys.name}</span>
              {sys.category === 'deprecated' && <span style={badge('#94a3b8')}>Sunsetting</span>}
              {sys.category === 'proposed' && <span style={badge('#3A7182')}>Proposed</span>}
              {sys.category === 'new-feature' && <span style={badge('#4640DE')}>New</span>}
            </td>
            <td style={td}>{sys.businessFunction}</td>
            <td style={td}>{deptMap[sys.department] || sys.department}</td>
            <NotesCell notes={sys.notes} onChange={(newNotes) => onNotesChange(sys.id, newNotes)} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DepartmentView({ systemsData, onNotesChange }) {
  const grouped = {};
  for (const dept of departments) {
    grouped[dept.id] = systemsData.filter(s => s.department === dept.id);
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th style={{ ...th, width: '15%' }}>Department</th>
          <th style={{ ...th, width: '15%' }}>Software</th>
          <th style={{ ...th, width: '15%' }}>Function</th>
          <th style={{ ...th, width: '55%' }}>Notes</th>
        </tr>
      </thead>
      <tbody>
        {departments.map(dept => {
          const deptSystems = grouped[dept.id] || [];
          if (deptSystems.length === 0) return null;

          return deptSystems.map((sys, idx) => (
            <tr key={sys.id}>
              {idx === 0 ? (
                <td style={{ ...td, fontWeight: 700, verticalAlign: 'top', borderBottom: 'none' }} rowSpan={deptSystems.length}>
                  <span style={{ color: dept.color }}>{dept.name}</span>
                </td>
              ) : null}
              <td style={td}>
                <span style={{ fontWeight: 600 }}>{sys.name}</span>
                {sys.category === 'deprecated' && <span style={badge('#94a3b8')}>Sunsetting</span>}
                {sys.category === 'proposed' && <span style={badge('#3A7182')}>Proposed</span>}
                {sys.category === 'new-feature' && <span style={badge('#4640DE')}>New</span>}
              </td>
              <td style={td}>{sys.businessFunction}</td>
              <NotesCell notes={sys.notes} onChange={(newNotes) => onNotesChange(sys.id, newNotes)} />
            </tr>
          ));
        })}
      </tbody>
    </table>
  );
}

export default function App() {
  const [view, setView] = useState('software');
  const { systemsData, handleNotesChange } = useNotesSync();

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{
        padding: '12px 20px',
        background: '#2B26A5',
        color: '#ffffff',
      }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, fontFamily: "'Petrona', Georgia, serif" }}>
          JCC Dallas — Systems Map
        </h1>
        <span style={{ fontSize: 12, color: '#D7D6EF' }}>
          On-Site Discovery Jan 2026
        </span>
      </div>

      {/* Toggle + Content */}
      <div style={{ padding: '16px 20px' }}>
        {/* View Toggle */}
        <div style={{ display: 'inline-flex', borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0', marginBottom: 16 }}>
          <button
            onClick={() => setView('software')}
            style={toggleBtn(view === 'software')}
          >
            By Software
          </button>
          <button
            onClick={() => setView('department')}
            style={toggleBtn(view === 'department')}
          >
            By Department
          </button>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
          {view === 'software'
            ? <SoftwareView systemsData={systemsData} onNotesChange={handleNotesChange} />
            : <DepartmentView systemsData={systemsData} onNotesChange={handleNotesChange} />
          }
        </div>
      </div>
    </div>
  );
}

/* --- Styles --- */

const th = {
  textAlign: 'left',
  padding: '10px 12px',
  fontSize: 13,
  fontWeight: 700,
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  borderBottom: '2px solid #e2e8f0',
  background: '#f8fafc',
};

const td = {
  padding: '8px 12px',
  fontSize: 15,
  color: '#1e293b',
  borderBottom: '1px solid #f1f5f9',
  verticalAlign: 'top',
};

const notesTextarea = {
  width: '100%',
  fontSize: 14,
  color: '#475569',
  lineHeight: 1.6,
  border: '1px solid #e2e8f0',
  borderRadius: 4,
  padding: '6px 8px',
  background: '#f8fafc',
  resize: 'vertical',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

function badge(color) {
  return {
    display: 'inline-block',
    marginLeft: 6,
    padding: '1px 6px',
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 700,
    color: '#fff',
    background: color,
    verticalAlign: 'middle',
  };
}

function toggleBtn(active) {
  return {
    padding: '6px 16px',
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    background: active ? '#2B26A5' : '#ffffff',
    color: active ? '#ffffff' : '#64748b',
    border: 'none',
    cursor: 'pointer',
  };
}
