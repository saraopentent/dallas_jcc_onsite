import { departments, systems, integrations } from './boardData';

const DEPT_COLORS = Object.fromEntries(departments.map(d => [d.id, d.color]));

// Tag classification regexes — shared with DetailPanel
const PAIN_RE = /pain|issue|problem|broken|doesn't|didn't|never|missing|outdated|paper-first|behind|didn't like|complexity|licensing|frustrated|triplicate|manual/i;
const INTEGRATION_RE = /api|integrat|zapier|apiway|connect|SF integration|open api|import|export/i;
const FEATURE_RE = /exploring|option|could|ideal|open to|possible|coming soon|would/i;

// Map filter bar tag IDs to regex matchers
const TAG_MATCHERS = {
  'pain-point': PAIN_RE,
  'integration': INTEGRATION_RE,
  'feature': FEATURE_RE,
};

function systemMatchesTags(sys, tags) {
  if (!tags || tags.length === 0) return true;
  return tags.some(tagId => {
    const re = TAG_MATCHERS[tagId];
    if (!re) return false;
    return sys.notes.some(n => re.test(n)) || sys.comments.some(c => re.test(c.text));
  });
}

function hasPainPoints(sys) {
  return sys.notes.some(n => PAIN_RE.test(n)) || sys.comments.some(c => PAIN_RE.test(c.text));
}

const CATEGORY_COLORS = {
  system: '#4640DE',       // Medium Sapphire
  integration: '#004154',  // Dark Teal
  'pain-point': '#AF49DF', // Dark Coral
  'new-feature': '#2B26A5',// Dark Sapphire
  potential: '#3A7182',    // Medium Teal
};

/**
 * Department View: nodes grouped spatially by department
 *
 * Left block (2×2): Membership & Programming division
 *   - Membership (Core), Camps, Preschool, Fitness & Aquatics
 * Right block: Finance, Events, Development, Marketing
 * Top center: Shared / Organization-Wide
 */
const DEPT_LAYOUT = {
  // Left block — Membership & Programming division
  camps:      { x: 30, y: 60 },
  membership: { x: 530, y: 60 },
  preschool:  { x: 30, y: 440 },
  fitness:    { x: 530, y: 440 },
  // Right block — independent departments
  finance:    { x: 1130, y: 60 },
  events:     { x: 1130, y: 640 },
  development:{ x: 1630, y: 60 },
  marketing:  { x: 1630, y: 400 },
  // Top center
  shared:     { x: 530, y: -260 },
};

// Departments belonging to the Membership & Programming division
const MP_DIVISION_DEPTS = ['membership', 'camps', 'preschool', 'fitness'];

export function buildDepartmentView(filters = {}) {
  const nodes = [];
  const edges = [];

  // Build system nodes first so we know which departments have visible systems
  const systemNodes = [];
  const deptCounters = {};
  for (const sys of systems) {
    if (filters.department && filters.department !== sys.department) continue;
    if (filters.search && !matchesSearch(sys, filters.search)) continue;

    const count = deptCounters[sys.department] || 0;
    deptCounters[sys.department] = count + 1;
    const col = count % 2;
    const row = Math.floor(count / 2);

    const deptLayout = DEPT_LAYOUT[sys.department] || { x: 0, y: 0 };

    systemNodes.push({
      id: sys.id,
      type: 'systemNode',
      position: {
        x: deptLayout.x + 20 + col * 210,
        y: deptLayout.y + 45 + row * 85,
      },
      data: {
        ...sys,
        color: DEPT_COLORS[sys.department],
        categoryColor: CATEGORY_COLORS[sys.category] || CATEGORY_COLORS.system,
        commentCount: sys.comments.length,
        noteCount: sys.notes.length,
        featureCount: sys.features.length,
        hasPainPoints: hasPainPoints(sys),
      },
    });
  }

  // Department group nodes — only show groups that have visible systems
  const hasSearch = !!filters.search;
  for (const dept of departments) {
    if (hasSearch && !deptCounters[dept.id]) continue;
    const layout = DEPT_LAYOUT[dept.id] || { x: 0, y: 0 };
    nodes.push({
      id: `dept-${dept.id}`,
      type: 'departmentGroup',
      position: { x: layout.x, y: layout.y },
      data: { label: dept.name, color: dept.color },
      style: {
        width: 460,
        height: hasSearch ? getGroupHeight(dept.id, deptCounters[dept.id] || 0) : getGroupHeight(dept.id),
        zIndex: -1,
      },
      draggable: false,
      selectable: false,
    });
  }

  // Parent division container for Membership & Programming
  const hasVisibleMPDept = MP_DIVISION_DEPTS.some(id => !hasSearch || deptCounters[id]);
  if (hasVisibleMPDept) {
    // Calculate height: spans both rows of M&P departments
    const topRowHeight = Math.max(
      getGroupHeight('membership', hasSearch ? deptCounters['membership'] || 0 : undefined),
      getGroupHeight('camps', hasSearch ? deptCounters['camps'] || 0 : undefined),
    );
    const bottomRowHeight = Math.max(
      getGroupHeight('preschool', hasSearch ? deptCounters['preschool'] || 0 : undefined),
      getGroupHeight('fitness', hasSearch ? deptCounters['fitness'] || 0 : undefined),
    );
    const divisionHeight = topRowHeight + bottomRowHeight + 420;

    nodes.push({
      id: 'division-mp',
      type: 'departmentGroup',
      position: { x: -10, y: -20 },
      data: { label: 'Membership & Programming', color: '#2B26A5', isDivision: true },
      style: {
        width: 1030,
        height: divisionHeight,
        zIndex: -2,
      },
      draggable: false,
      selectable: false,
    });
  }

  nodes.push(...systemNodes);

  // Edges
  for (const int of integrations) {
    if (int.status === 'potential' && !filters.showPotentialIntegrations) continue;
    const sourceExists = nodes.some(n => n.id === int.source);
    const targetExists = nodes.some(n => n.id === int.target);
    if (!sourceExists || !targetExists) continue;

    edges.push({
      id: int.id,
      source: int.source,
      target: int.target,
      type: 'smoothstep',
      animated: false,
      label: int.label || '',
      style: {
        stroke: int.status === 'existing' ? '#004154'
          : int.status === 'broken' ? '#AF49DF'
          : int.status === 'manual' ? '#E17440'
          : '#3A7182',
        strokeDasharray: int.status === 'potential' ? '5 5' : undefined,
        strokeWidth: 2,
      },
      data: { ...int },
    });
  }

  return { nodes, edges };
}

/**
 * System-Centric View: shared systems in center, departments radiate outward
 */
export function buildSystemCentricView(filters = {}) {
  const nodes = [];
  const edges = [];

  // Find systems used by multiple departments or that are integration hubs
  const hubSystems = ['avocado', 'odoo', 'ms365', 'mailchimp'];
  const centerX = 600;
  const centerY = 400;
  const innerRadius = 150;
  const outerRadius = 400;

  // Place hub systems in the center ring
  hubSystems.forEach((sysId, i) => {
    const sys = systems.find(s => s.id === sysId);
    if (!sys) return;
    if (filters.search && !matchesSearch(sys, filters.search)) return;

    const angle = (i / hubSystems.length) * 2 * Math.PI - Math.PI / 2;
    nodes.push({
      id: sys.id,
      type: 'systemNode',
      position: {
        x: centerX + Math.cos(angle) * innerRadius - 90,
        y: centerY + Math.sin(angle) * innerRadius - 30,
      },
      data: {
        ...sys,
        color: DEPT_COLORS[sys.department],
        categoryColor: '#2B26A5',
        isHub: true,
        commentCount: sys.comments.length,
        noteCount: sys.notes.length,
        featureCount: sys.features.length,
        hasPainPoints: hasPainPoints(sys),
      },
    });
  });

  // Place department systems around the outside
  const deptList = departments.filter(d => d.id !== 'shared');
  deptList.forEach((dept, di) => {
    const angle = (di / deptList.length) * 2 * Math.PI - Math.PI / 2;
    const deptSystems = systems.filter(s => s.department === dept.id && !hubSystems.includes(s.id));

    if (filters.department && filters.department !== dept.id) return;

    deptSystems.forEach((sys, si) => {
      if (filters.search && !matchesSearch(sys, filters.search)) return;

      const spread = 0.3;
      const sysAngle = angle + (si - deptSystems.length / 2) * spread * 0.15;
      const radius = outerRadius + si * 30;

      nodes.push({
        id: sys.id,
        type: 'systemNode',
        position: {
          x: centerX + Math.cos(sysAngle) * radius - 90,
          y: centerY + Math.sin(sysAngle) * radius - 30,
        },
        data: {
          ...sys,
          color: dept.color,
          categoryColor: CATEGORY_COLORS[sys.category] || CATEGORY_COLORS.system,
          commentCount: sys.comments.length,
          noteCount: sys.notes.length,
          featureCount: sys.features.length,
          hasPainPoints: hasPainPoints(sys),
        },
      });
    });
  });

  // Edges
  for (const int of integrations) {
    if (int.status === 'potential' && !filters.showPotentialIntegrations) continue;
    const sourceExists = nodes.some(n => n.id === int.source);
    const targetExists = nodes.some(n => n.id === int.target);
    if (!sourceExists || !targetExists) continue;

    edges.push({
      id: int.id,
      source: int.source,
      target: int.target,
      type: 'smoothstep',
      animated: false,
      label: int.label || '',
      style: {
        stroke: int.status === 'existing' ? '#004154'
          : int.status === 'broken' ? '#AF49DF'
          : int.status === 'manual' ? '#E17440'
          : '#3A7182',
        strokeDasharray: int.status === 'potential' ? '5 5' : undefined,
        strokeWidth: 2,
      },
      data: { ...int },
    });
  }

  return { nodes, edges };
}

function matchesSearch(sys, search) {
  const s = search.toLowerCase();
  return sys.name.toLowerCase().includes(s)
    || sys.features.some(f => f.toLowerCase().includes(s))
    || sys.notes.some(n => n.toLowerCase().includes(s))
    || sys.comments.some(c => c.text?.toLowerCase().includes(s));
}

function getGroupHeight(deptId, overrideCount) {
  const count = overrideCount ?? systems.filter(s => s.department === deptId).length;
  return Math.max(180, Math.ceil(count / 2) * 95 + 65);
}
