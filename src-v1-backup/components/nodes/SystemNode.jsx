import { Handle, Position } from '@xyflow/react';

export default function SystemNode({ data, selected }) {
  const isProposed = data.category === 'proposed';
  const isDeprecated = data.category === 'deprecated';
  const isNewFeature = data.category === 'new-feature';
  const borderColor = selected ? '#2B26A5' : isDeprecated ? '#94a3b8' : data.color;

  return (
    <div
      className="relative"
      style={{
        width: 180,
        minHeight: 56,
        background: isDeprecated ? '#f1f5f9' : '#ffffff',
        border: `2px ${isProposed ? 'dashed' : 'solid'} ${borderColor}`,
        borderRadius: data.isHub ? '50%' : 10,
        padding: data.isHub ? '16px 10px' : '8px 10px',
        boxShadow: selected
          ? `0 0 0 3px ${data.color}33, 0 4px 12px rgba(0,0,0,0.15)`
          : '0 1px 4px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        opacity: isDeprecated ? 0.6 : 1,
      }}
    >
      {/* Proposed / New badge */}
      {(isProposed || isNewFeature) && (
        <div
          style={{
            position: 'absolute',
            top: -8,
            right: 8,
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: '#ffffff',
            background: isProposed ? '#3A7182' : '#4640DE',
            padding: '1px 6px',
            borderRadius: 4,
          }}
        >
          {isProposed ? 'PROPOSED' : 'NEW'}
        </div>
      )}

      {/* Business function — the primary label */}
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: isDeprecated ? '#94a3b8' : data.color,
          lineHeight: 1.2,
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        {data.businessFunction || data.features?.[0] || ''}
      </div>

      {/* Divider line */}
      <div
        style={{
          width: '100%',
          height: 1,
          background: isDeprecated ? '#cbd5e1' : `${data.color}30`,
          margin: '4px 0',
        }}
      />

      {/* Tool name */}
      <div
        style={{
          fontWeight: 600,
          fontSize: 12,
          color: isDeprecated ? '#94a3b8' : '#1e293b',
          lineHeight: 1.2,
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        {data.name}
      </div>

      {/* Deprecated label */}
      {isDeprecated && (
        <span style={{
          fontSize: 8,
          fontWeight: 700,
          color: '#94a3b8',
          letterSpacing: '0.05em',
          marginTop: 2,
          display: 'block',
        }}>
          SUNSETTING
        </span>
      )}

      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} id="left" />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} id="right" />
    </div>
  );
}
