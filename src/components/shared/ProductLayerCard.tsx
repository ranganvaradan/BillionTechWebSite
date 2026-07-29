import { Box, Chip, Typography } from '@mui/material';
import type { ProductLayer } from '@/data/products';
import { colors } from '@/theme/tokens';

interface ProductLayerCardProps {
  layer: ProductLayer;
  accent?: 'primary' | 'info';
}

export function ProductLayerCard({ layer, accent = 'primary' }: ProductLayerCardProps) {
  const accentColor = accent === 'info' ? colors.info : colors.primary;

  return (
    <Box
      sx={{
        height: '100%',
        p: { xs: 3, md: 3.5 },
        backgroundColor: colors.white,
        border: `1px solid ${colors.gray200}`,
        borderTop: `3px solid ${accentColor}`,
      }}
    >
      <Chip
        label={layer.role}
        size="small"
        sx={{
          mb: 1.5,
          height: 22,
          fontSize: '0.7rem',
          fontWeight: 600,
          backgroundColor: accent === 'info' ? colors.infoLight : colors.primaryLight,
          color: accent === 'info' ? colors.info : colors.primaryHover,
        }}
      />
      <Typography variant="h5" sx={{ mb: 1, fontSize: '1.35rem' }}>
        {layer.name}
      </Typography>
      <Typography variant="body2" sx={{ color: colors.gray500, mb: 2.5 }}>
        {layer.description}
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 2.25 }}>
        {layer.items.map((item) => (
          <Typography component="li" variant="body2" key={item} sx={{ mb: 1, color: colors.gray700 }}>
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
