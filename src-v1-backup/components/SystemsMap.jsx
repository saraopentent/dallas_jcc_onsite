import { useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import SystemNode from './nodes/SystemNode';
import DepartmentGroup from './nodes/DepartmentGroup';
import Legend from './Legend';
import { buildDepartmentView, buildSystemCentricView } from '../data/transform';

const nodeTypes = {
  systemNode: SystemNode,
  departmentGroup: DepartmentGroup,
};

function MapInner({ view, filters, onNodeSelect }) {
  const { fitView } = useReactFlow();

  const { initialNodes, initialEdges } = useMemo(() => {
    const builder = view === 'department' ? buildDepartmentView : buildSystemCentricView;
    const { nodes, edges } = builder(filters);
    return { initialNodes: nodes, initialEdges: edges };
  }, [view, filters]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync when view or filters change, then re-fit
  useMemo(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  useEffect(() => {
    const timer = setTimeout(() => fitView({ padding: 0.15, duration: 300 }), 50);
    return () => clearTimeout(timer);
  }, [initialNodes, initialEdges, fitView]);

  const onNodeClick = useCallback((_, node) => {
    if (node.type === 'systemNode') {
      onNodeSelect(node.data);
    }
  }, [onNodeSelect]);

  const onPaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  // Check if there are any system nodes (not department groups)
  const hasSystemNodes = nodes.some(n => n.type === 'systemNode');

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#e2e8f0" gap={20} size={1} />
        <Controls position="bottom-right" />
      </ReactFlow>
      {!hasSystemNodes && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            padding: '24px 32px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}>No systems match your filters</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Try adjusting your search or filter criteria</div>
          </div>
        </div>
      )}
    </>
  );
}

export default function SystemsMap({ view, filters, onNodeSelect }) {
  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <ReactFlowProvider>
        <MapInner view={view} filters={filters} onNodeSelect={onNodeSelect} />
      </ReactFlowProvider>
      <Legend />
    </div>
  );
}
