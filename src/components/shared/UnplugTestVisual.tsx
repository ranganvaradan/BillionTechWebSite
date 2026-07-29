import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { colors } from '@/theme/tokens';

/** Named Unplug Test visual — AI on vs AI off. */
export function UnplugTestVisual() {
  const [aiOn, setAiOn] = useState(true);

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        backgroundColor: colors.gray50,
        border: `1px solid ${colors.gray200}`,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="overline" sx={{ color: colors.gray700, fontWeight: 700, letterSpacing: '0.1em' }}>
            The Unplug Test
          </Typography>
          <Typography variant="h5" sx={{ fontSize: '1.35rem' }}>
            AI is core — not a side panel
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAiOn((v) => !v)}
          aria-pressed={aiOn}
        >
          {aiOn ? 'AI on — click to unplug' : 'AI off — click to restore'}
        </Button>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2.5,
        }}
      >
        <Box
          sx={{
            p: 3,
            backgroundColor: aiOn ? colors.primaryLight : colors.white,
            border: `1px solid ${aiOn ? colors.primary : colors.gray200}`,
            opacity: aiOn ? 1 : 0.55,
          }}
        >
          <Typography sx={{ fontWeight: 700, color: colors.primaryHover, mb: 1 }}>AI on</Typography>
          <Typography variant="body2" sx={{ color: colors.gray700 }}>
            Agents draft RFQs, match invoices, score credit risk, and prepare memos. The platform’s
            intelligence layer is active across P2P, O2C, SCF, and Lend.
          </Typography>
        </Box>
        <Box
          sx={{
            p: 3,
            backgroundColor: !aiOn ? colors.errorLight : colors.white,
            border: `1px solid ${!aiOn ? colors.error : colors.gray200}`,
            opacity: !aiOn ? 1 : 0.55,
          }}
        >
          <Typography sx={{ fontWeight: 700, color: colors.error, mb: 1 }}>AI off</Typography>
          <Typography variant="body2" sx={{ color: colors.gray700 }}>
            Unplug AI and autonomous matching, agent workflows, and credit drafting stop. If the
            platform still “works” without AI, it failed the Unplug Test.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
