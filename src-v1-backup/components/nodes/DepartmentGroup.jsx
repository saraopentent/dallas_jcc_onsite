export default function DepartmentGroup({ data }) {
  const isDivision = data.isDivision;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: isDivision ? `${data.color}05` : `${data.color}08`,
        border: `2px ${isDivision ? 'dashed' : 'solid'} ${data.color}${isDivision ? '20' : '30'}`,
        borderRadius: isDivision ? 20 : 16,
        padding: isDivision ? '8px 14px' : '12px 16px',
      }}
    >
      <div style={{
        fontWeight: 700,
        fontSize: isDivision ? 16 : 14,
        color: data.color,
        letterSpacing: isDivision ? '0.03em' : '0.02em',
        fontFamily: isDivision ? "'Petrona', Georgia, serif" : undefined,
      }}>
        {data.label}
      </div>
    </div>
  );
}
