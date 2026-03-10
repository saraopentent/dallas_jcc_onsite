const LEGEND_ITEMS = [
  { color: '#004154', label: 'Existing Integration', style: 'solid' },    // Dark Teal
  { color: '#3A7182', label: 'Potential Integration', style: 'dashed' },  // Medium Teal
  { color: '#E17440', label: 'Manual Process', style: 'solid' },          // Medium Lavender
  { color: '#AF49DF', label: 'Broken / Unfulfilled', style: 'solid' },    // Dark Coral
  { color: '#4640DE', label: 'New / Proposed', style: 'dot' },            // Medium Sapphire
];

export default function Legend() {
  return (
    <div style={{
      position: 'absolute',
      bottom: 16,
      left: 16,
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: 12,
      padding: '12px 16px',
      zIndex: 30,
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        fontSize: 10,
        fontWeight: 700,
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: 8,
      }}>
        Legend
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {LEGEND_ITEMS.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {item.style === 'dot' ? (
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: item.color,
                flexShrink: 0,
              }} />
            ) : (
              <div style={{
                width: 24,
                height: 0,
                borderTop: `2px ${item.style} ${item.color}`,
                flexShrink: 0,
              }} />
            )}
            <span style={{ fontSize: 11, color: '#475569' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
