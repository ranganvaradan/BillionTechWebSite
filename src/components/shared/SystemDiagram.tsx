import { Box } from '@mui/material';
import { colors } from '@/theme/tokens';

/**
 * Hero system diagram — two platform clusters (Flow / LEND) into BillionTech,
 * with links out to ERP / Suppliers / Distributors / Banks & NBFCs.
 */
export function SystemDiagram() {
  const flowProducts = [
    { label: 'Flow P2P', x: 22, y: 34 },
    { label: 'Flow O2C', x: 22, y: 52 },
  ];

  const financeProducts = [
    { label: 'SCF', x: 78, y: 34, fontSize: 2.4 },
    { label: 'Loan Origination System', x: 78, y: 52, fontSize: 1.9, width: 30 },
  ];

  const allProducts = [...flowProducts, ...financeProducts];

  const externals = [
    { label: 'ERP', x: 50, y: 6 },
    { label: 'Suppliers', x: 6, y: 72 },
    { label: 'Distributors', x: 94, y: 72 },
    { label: 'Banks & NBFCs', x: 50, y: 94 },
  ];

  const renderProduct = (n: {
    label: string;
    x: number;
    y: number;
    fontSize?: number;
    width?: number;
  }) => {
    const boxWidth = n.width ?? 26;
    return (
      <g key={n.label}>
        <rect
          x={n.x - boxWidth / 2}
          y={n.y - 5}
          width={boxWidth}
          height="10"
          rx="1.4"
          fill={colors.white}
          stroke={colors.primary}
          strokeWidth="0.55"
        />
        <text
          x={n.x}
          y={n.y + 1.2}
          textAnchor="middle"
          fill={colors.gray900}
          fontSize={String(n.fontSize ?? 2.4)}
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          {n.label}
        </text>
      </g>
    );
  };

  return (
    <Box
      role="img"
      aria-label="System diagram: BillionTech Flow (Flow P2P, Flow O2C) and BillionTech LEND (SCF, Loan Origination System) connecting to BillionTech, with links to ERP, Suppliers, Distributors, and Banks & NBFCs"
      sx={{
        width: '100%',
        maxWidth: 560,
        aspectRatio: '1.15 / 1',
        mx: 'auto',
        position: 'relative',
      }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ display: 'block' }}>
        {/* Cluster backgrounds */}
        <rect
          x="6"
          y="16"
          width="32"
          height="48"
          rx="2"
          fill="rgba(249, 115, 22, 0.08)"
          stroke="rgba(249, 115, 22, 0.35)"
          strokeWidth="0.35"
        />
        <rect
          x="62"
          y="16"
          width="32"
          height="48"
          rx="2"
          fill="rgba(249, 115, 22, 0.08)"
          stroke="rgba(249, 115, 22, 0.35)"
          strokeWidth="0.35"
        />

        {/* Cluster labels */}
        <text
          x="22"
          y="21.5"
          textAnchor="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize="2.2"
          fontWeight="700"
          fontFamily="Plus Jakarta Sans, Inter, sans-serif"
          letterSpacing="0.02em"
        >
          BillionTech Flow
        </text>
        <text
          x="78"
          y="21.5"
          textAnchor="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize="2.2"
          fontWeight="700"
          fontFamily="Plus Jakarta Sans, Inter, sans-serif"
        >
          BillionTech LEND
        </text>

        {allProducts.map((n) => (
          <line
            key={`line-${n.label}`}
            x1={n.x}
            y1={n.y}
            x2={50}
            y2={50}
            stroke={colors.primary}
            strokeWidth="0.45"
            opacity="0.7"
          />
        ))}
        {externals.map((n) => (
          <line
            key={`ext-${n.label}`}
            x1={n.x}
            y1={n.y}
            x2={50}
            y2={50}
            stroke="rgba(148, 163, 184, 0.85)"
            strokeWidth="0.35"
            strokeDasharray="1.2 1"
            opacity="0.8"
          />
        ))}

        {externals.map((n) => (
          <g key={n.label}>
            <rect
              x={n.x - 11}
              y={n.y - 3.8}
              width="22"
              height="7.6"
              rx="1.2"
              fill="rgba(255,255,255,0.08)"
              stroke="rgba(148, 163, 184, 0.7)"
              strokeWidth="0.35"
            />
            <text
              x={n.x}
              y={n.y + 1.1}
              textAnchor="middle"
              fill="rgba(226, 232, 240, 0.95)"
              fontSize="2.2"
              fontFamily="Inter, sans-serif"
            >
              {n.label}
            </text>
          </g>
        ))}

        {flowProducts.map(renderProduct)}
        {financeProducts.map(renderProduct)}

        <circle cx="50" cy="50" r="10" fill={colors.primary} />
        <circle cx="50" cy="50" r="10" fill="none" stroke={colors.white} strokeWidth="0.35" opacity="0.35" />
        <text
          x="50"
          y="51.3"
          textAnchor="middle"
          fill={colors.white}
          fontSize="2.7"
          fontWeight="700"
          fontFamily="Plus Jakarta Sans, Inter, sans-serif"
        >
          BillionTech
        </text>
      </svg>
    </Box>
  );
}
