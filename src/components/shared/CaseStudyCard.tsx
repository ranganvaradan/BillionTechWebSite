import { Box, Typography } from '@mui/material';
import type { CaseStudy } from '@/data/caseStudies';
import { colors } from '@/theme/tokens';

interface CaseStudyCardProps {
  study: CaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        backgroundColor: colors.white,
        border: `1px solid ${colors.gray200}`,
        borderLeft: `4px solid ${colors.info}`,
      }}
    >
      <Typography
        variant="overline"
        sx={{ color: colors.gray700, fontWeight: 700, letterSpacing: '0.08em' }}
      >
        {study.product} · Proof
      </Typography>
      <Typography variant="h4" sx={{ mt: 1, mb: 2, fontSize: { xs: '1.4rem', md: '1.75rem' } }}>
        {study.name}
      </Typography>
      <Typography variant="body1" sx={{ color: colors.gray700, mb: 3, maxWidth: 720 }}>
        {study.summary}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: `repeat(${Math.min(study.metrics.length, 3)}, 1fr)` },
          gap: 2,
          mb: study.note || study.before ? 3 : 0,
        }}
      >
        {study.metrics.map((m) => (
          <Box key={m.label} sx={{ p: 2, backgroundColor: colors.gray50 }}>
            <Typography
              sx={{
                fontFamily: (t) => t.typography.h1.fontFamily,
                fontWeight: 700,
                fontSize: '1.5rem',
                color: colors.gray900,
                mb: 0.5,
              }}
            >
              {m.value}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.gray500 }}>
              {m.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {(study.before || study.after) && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
            mb: study.note ? 2 : 0,
          }}
        >
          {study.before && (
            <Box sx={{ p: 2.5, backgroundColor: colors.gray200 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: colors.gray700 }}>
                Before
              </Typography>
              <Typography variant="body2">{study.before}</Typography>
            </Box>
          )}
          {study.after && (
            <Box sx={{ p: 2.5, backgroundColor: colors.primaryLight }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: colors.primaryHover }}>
                After
              </Typography>
              <Typography variant="body2">{study.after}</Typography>
            </Box>
          )}
        </Box>
      )}

      {study.note && (
        <Typography variant="caption" sx={{ color: colors.gray500, display: 'block' }}>
          {study.note}
        </Typography>
      )}
    </Box>
  );
}
