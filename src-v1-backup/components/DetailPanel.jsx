import { departments } from '../data/boardData';

const TAG_COLORS = {
  'Pain Point': { bg: '#F1D3FF', text: '#AF49DF', border: '#DE9FFC' },       // Coral palette
  'Integration Note': { bg: '#C6DAE0', text: '#004154', border: '#3A7182' },  // Teal palette
  'Feature Request': { bg: '#D7D6EF', text: '#2B26A5', border: '#4640DE' },   // Sapphire palette
  'Observation': { bg: '#FBE9D2', text: '#D34829', border: '#E17440' },       // Lavender palette
};

function tagNote(note) {
  if (/pain|issue|problem|broken|doesn't|didn't|never|missing|outdated|paper-first|behind|didn't like|complexity|licensing|frustrated|triplicate|manual/i.test(note)) {
    return 'Pain Point';
  }
  if (/api|integrat|zapier|apiway|connect|SF integration|open api|import|export/i.test(note)) {
    return 'Integration Note';
  }
  if (/exploring|option|could|ideal|open to|possible|coming soon|would/i.test(note)) {
    return 'Feature Request';
  }
  return 'Observation';
}

export default function DetailPanel({ system, onClose }) {
  if (!system) return null;

  const dept = departments.find(d => d.id === system.department);

  // Group notes by tag
  const taggedNotes = system.notes.map(n => ({ text: n, tag: tagNote(n) }));
  const painPoints = taggedNotes.filter(n => n.tag === 'Pain Point');
  const integrationNotes = taggedNotes.filter(n => n.tag === 'Integration Note');
  const featureRequests = taggedNotes.filter(n => n.tag === 'Feature Request');
  const observations = taggedNotes.filter(n => n.tag === 'Observation');

  return (
    <div style={{
      position: 'absolute',
      right: 0,
      top: 0,
      width: 380,
      height: '100%',
      background: '#ffffff',
      borderLeft: '1px solid #e2e8f0',
      boxShadow: '-4px 0 20px rgba(0,0,0,0.08)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '1px solid #e2e8f0',
        background: `linear-gradient(135deg, ${dept?.color}10, #ffffff)`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>
              {system.name}
            </h2>
            <span style={{
              display: 'inline-block',
              marginTop: 6,
              padding: '2px 10px',
              borderRadius: 12,
              fontSize: 11,
              fontWeight: 600,
              background: dept?.color + '18',
              color: dept?.color,
            }}>
              {dept?.name}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '1px solid #e2e8f0',
              background: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              color: '#64748b',
            }}
          >
            &#x2715;
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
        {/* Features */}
        {system.features.length > 0 && (
          <Section title="Capabilities">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {system.features.map((f, i) => (
                <span key={i} style={{
                  padding: '3px 10px',
                  borderRadius: 6,
                  fontSize: 12,
                  background: '#f1f5f9',
                  color: '#334155',
                  border: '1px solid #e2e8f0',
                }}>
                  {f}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Pain Points */}
        {painPoints.length > 0 && (
          <Section title={`Pain Points (${painPoints.length})`}>
            {painPoints.map((n, i) => (
              <TaggedNote key={i} note={n} />
            ))}
          </Section>
        )}

        {/* Integration Notes */}
        {integrationNotes.length > 0 && (
          <Section title={`Integration Notes (${integrationNotes.length})`}>
            {integrationNotes.map((n, i) => (
              <TaggedNote key={i} note={n} />
            ))}
          </Section>
        )}

        {/* Feature Requests */}
        {featureRequests.length > 0 && (
          <Section title={`Feature Requests (${featureRequests.length})`}>
            {featureRequests.map((n, i) => (
              <TaggedNote key={i} note={n} />
            ))}
          </Section>
        )}

        {/* Other Observations */}
        {observations.length > 0 && (
          <Section title={`Observations (${observations.length})`}>
            {observations.map((n, i) => (
              <TaggedNote key={i} note={n} />
            ))}
          </Section>
        )}

        {/* Comments from Miro */}
        {system.comments.length > 0 && (
          <Section title={`Team Comments (${system.comments.length})`}>
            {system.comments.map((c, i) => (
              <div key={i} style={{
                padding: '8px 12px',
                background: '#f8fafc',
                borderRadius: 8,
                marginBottom: 8,
                borderLeft: '3px solid #4640DE',
              }}>
                <div style={{ fontSize: 12, color: '#334155' }}>{c.text}</div>
                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 4 }}>
                  {c.author} {c.date ? `- ${new Date(c.date).toLocaleDateString()}` : ''}
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* No data state */}
        {system.notes.length === 0 && system.comments.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: '#94a3b8' }}>
            <p style={{ fontSize: 13 }}>No additional notes or comments for this system.</p>
            <p style={{ fontSize: 11 }}>Comments from the Miro board will appear here after running the export script.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h3 style={{
        fontSize: 12,
        fontWeight: 700,
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: 8,
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function TaggedNote({ note }) {
  const colors = TAG_COLORS[note.tag] || TAG_COLORS['Observation'];
  return (
    <div style={{
      padding: '8px 12px',
      background: colors.bg,
      border: `1px solid ${colors.border}`,
      borderRadius: 8,
      marginBottom: 6,
    }}>
      <div style={{
        fontSize: 10,
        fontWeight: 600,
        color: colors.text,
        marginBottom: 3,
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
      }}>
        {note.tag}
      </div>
      <div style={{ fontSize: 12, color: '#334155', lineHeight: 1.4 }}>
        {note.text}
      </div>
    </div>
  );
}
