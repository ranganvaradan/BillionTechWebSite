import { Box, Typography } from '@mui/material';
import type { CapabilityGroup } from '@/data/products';
import { colors } from '@/theme/tokens';

interface CapabilityGroupProps {
  group: CapabilityGroup;
}

export function CapabilityGroupBlock({ group }: CapabilityGroupProps) {
  return (
    <Box
      sx={{
        height: '100%',
        p: 3,
        backgroundColor: colors.gray50,
        borderTop: `3px solid ${colors.info}`,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontSize: '1.1rem' }}>
        {group.title}
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 2.25 }}>
        {group.items.map((item) => (
          <Typography component="li" variant="body2" key={item} sx={{ mb: 1, color: colors.gray700 }}>
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
