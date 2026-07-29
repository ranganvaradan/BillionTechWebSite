import { Box, Typography } from '@mui/material';
import type { WorkflowStep } from '@/data/products';
import { colors } from '@/theme/tokens';

interface WorkflowDiagramProps {
  steps: WorkflowStep[];
}

export function WorkflowDiagram({ steps }: WorkflowDiagramProps) {
  return (
    <Box
      role="list"
      aria-label="How it works workflow"
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: steps.length > 4 ? '1fr 1fr' : `repeat(${Math.min(steps.length, 2)}, 1fr)`,
          md: `repeat(${Math.min(steps.length, 3)}, 1fr)`,
          lg: `repeat(${Math.min(steps.length, 7)}, 1fr)`,
        },
        gap: { xs: 2, md: 1.5 },
      }}
    >
      {steps.map((step, i) => (
        <Box
          key={step.step}
          role="listitem"
          sx={{
            position: 'relative',
            p: { xs: 2, md: 2.5 },
            backgroundColor: colors.white,
            border: `1px solid ${colors.gray200}`,
            minHeight: { xs: 0, md: 160 },
          }}
        >
          <Typography
            sx={{
              fontFamily: (t) => t.typography.h1.fontFamily,
              fontWeight: 700,
              fontSize: '1.75rem',
              color: colors.primaryHover,
              lineHeight: 1,
              mb: 1.5,
            }}
          >
            {String(step.step).padStart(2, '0')}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.gray900, mb: 1 }}>
            {step.title}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.gray500 }}>
            {step.description}
          </Typography>
          {i < steps.length - 1 && (
            <Typography
              aria-hidden
              sx={{
                display: { xs: 'none', lg: 'block' },
                position: 'absolute',
                right: -10,
                top: '42%',
                color: colors.primary,
                fontWeight: 700,
                fontSize: '1.1rem',
                zIndex: 1,
              }}
            >
              →
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}
