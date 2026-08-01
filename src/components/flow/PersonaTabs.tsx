import { useState, type ReactNode, type SyntheticEvent } from 'react';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { clientDescriptors } from '@/data/clients';
import { colors } from '@/theme/tokens';
import { RfqPipelineMockup } from './RfqPipelineMockup';
import { ThreeWayMatchMockup } from './ThreeWayMatchMockup';
import { O2cReconciliationMockup } from './O2cReconciliationMockup';

interface PersonaTab {
  id: string;
  label: string;
  audience: string;
  productLabel: string;
  productHref: string;
  capabilities: string[];
  statValue: string;
  statLabel: string;
  mockup: ReactNode;
}

/** Real stats/capabilities only — strings already established on product pages. */
const personaTabs: PersonaTab[] = [
  {
    id: 'procurement',
    label: 'Procurement',
    audience: 'CPO / Head of Procurement',
    productLabel: 'Flow P2P',
    productHref: '/products/flow-p2p',
    capabilities: [
      'RFQ generation from work orders with full specs',
      'Quote capture and comparison from email, any format',
      '3-way match: PO / GRN / Invoice',
      '80%+ invoices auto-cleared',
    ],
    statValue: '80%+',
    statLabel: 'Invoices auto-matched / auto-cleared',
    mockup: (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr' },
          gap: 2,
        }}
      >
        <RfqPipelineMockup />
        <ThreeWayMatchMockup />
      </Box>
    ),
  },
  {
    id: 'finance',
    label: 'Finance',
    audience: 'CFO / Finance Director',
    productLabel: 'Flow O2C',
    productHref: '/products/flow-o2c',
    capabilities: [
      'Virtual account payment rails',
      '80%+ payments auto-matched',
      'Auto-allocation to open invoices',
      'Collections and cash-flow intelligence',
    ],
    statValue: '15–20',
    statLabel: 'Days DSO reduction',
    mockup: <O2cReconciliationMockup />,
  },
  {
    id: 'distributor-ops',
    label: 'Distributor Ops',
    audience: 'Distributor network operations',
    productLabel: 'Flow O2C',
    productHref: '/products/flow-o2c',
    capabilities: [
      'Distributor self-service portal',
      'Open-item sync for distributors and finance',
      'Credit and debit note handling',
      `Visibility across 3,500+ distributors (${clientDescriptors.ttkPrestige} network)`,
    ],
    statValue: '3,500+',
    statLabel: 'Distributors on platform',
    mockup: <O2cReconciliationMockup />,
  },
];

/**
 * Persona-tabbed section for /platform/flow.
 * Tab underline mirrors AppHeader active nav (primary border-bottom).
 */
export function PersonaTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, next: number) => {
    setValue(next);
  };

  const active = personaTabs[value];

  return (
    <Box id="persona-views">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="BillionTech Flow persona views"
        TabIndicatorProps={{
          sx: { backgroundColor: colors.primary, height: 2 },
        }}
        sx={{
          minHeight: 44,
          borderBottom: `1px solid ${colors.gray200}`,
          mb: { xs: 3, md: 4 },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.95rem',
            color: colors.gray700,
            minHeight: 44,
            px: { xs: 1.5, md: 2.5 },
            borderBottom: '2px solid transparent',
            '&.Mui-selected': {
              color: colors.primary,
              fontWeight: 600,
            },
          },
        }}
      >
        {personaTabs.map((tab) => (
          <Tab key={tab.id} id={`persona-tab-${tab.id}`} label={tab.label} />
        ))}
      </Tabs>

      <Box
        role="tabpanel"
        id={`persona-panel-${active.id}`}
        aria-labelledby={`persona-tab-${active.id}`}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '0.95fr 1.05fr' },
          gap: { xs: 3, md: 4 },
          alignItems: 'start',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: colors.primary,
              mb: 1,
            }}
          >
            {active.audience}
          </Typography>
          <Typography
            component="h3"
            sx={{
              fontFamily: (t) => t.typography.h1.fontFamily,
              fontWeight: 700,
              fontSize: { xs: '1.35rem', md: '1.5rem' },
              color: colors.gray900,
              mb: 2,
            }}
          >
            Built for {active.label.toLowerCase()} outcomes in {active.productLabel}
          </Typography>

          <Box
            component="ul"
            sx={{
              m: 0,
              mb: 3,
              pl: 2.25,
              color: colors.gray700,
              '& li': { mb: 1, fontSize: '0.98rem', lineHeight: 1.55 },
            }}
          >
            {active.capabilities.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 1.5,
              flexWrap: 'wrap',
              mb: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: colors.primaryLight,
              border: `1px solid ${colors.primaryBorder}`,
            }}
          >
            <Typography
              sx={{
                fontFamily: (t) => t.typography.h1.fontFamily,
                fontWeight: 700,
                fontSize: { xs: '1.75rem', md: '2rem' },
                color: colors.gray900,
                lineHeight: 1,
              }}
            >
              {active.statValue}
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', color: colors.gray700, maxWidth: 280 }}>
              {active.statLabel}
            </Typography>
          </Box>

          <Button
            component={RouterLink}
            to={active.productHref}
            variant="outlined"
            color="primary"
          >
            Explore {active.productLabel}
          </Button>
        </Box>

        <Box>{active.mockup}</Box>
      </Box>
    </Box>
  );
}
