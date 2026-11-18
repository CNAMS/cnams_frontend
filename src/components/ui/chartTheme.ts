/**
 * One look for every Recharts chart (docs/DESIGN.md §4, §5).
 *
 * Six pages styled their tooltips, axes and grids by hand, each slightly
 * differently. Spread these into the Recharts components instead:
 *
 *   <CartesianGrid {...chartGrid} />
 *   <XAxis {...chartAxis} dataKey="month" />
 *   <Tooltip {...chartTooltip} />
 *
 * Everything reads CSS variables, so charts follow the role skin and dark
 * mode. Clinical series keep their fixed colours from styleFor().
 */

export const chartGrid = {
  strokeDasharray: '3 3',
  vertical: false,
  stroke: 'var(--outline-variant)',
} as const;

export const chartAxis = {
  tickLine: false,
  axisLine: false,
  tick: { fill: 'var(--text-faint)', fontSize: 12 },
} as const;

export const chartTooltip = {
  contentStyle: {
    borderRadius: 8,
    border: '1px solid var(--outline-variant)',
    background: 'var(--surface-raised)',
    color: 'var(--on-surface)',
    boxShadow: 'var(--shadow-md)',
    fontSize: 13,
    padding: '8px 10px',
  },
  labelStyle: { color: 'var(--on-surface-variant)', fontWeight: 500, marginBottom: 2 },
  itemStyle: { color: 'var(--on-surface)', padding: 0 },
  cursor: { stroke: 'var(--line-strong)', fill: 'var(--surface-variant)' },
} as const;

export const chartLegend = {
  wrapperStyle: { fontSize: 12, paddingTop: 8, color: 'var(--on-surface-variant)' },
  iconType: 'circle' as const,
  iconSize: 8,
};
