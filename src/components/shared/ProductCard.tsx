import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Product } from '@/data/products';
import { colors } from '@/theme/tokens';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        backgroundColor: colors.white,
        border: `1px solid ${colors.gray200}`,
        borderTop: `3px solid ${colors.primary}`,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }} flexWrap="wrap" useFlexGap>
        <Typography variant="h5" sx={{ fontSize: '1.25rem' }}>
          {product.name}
        </Typography>
        <Chip
          label={product.statusBadge}
          size="small"
          sx={{
            height: 22,
            fontSize: '0.7rem',
            fontWeight: 600,
                            backgroundColor: colors.primaryLight,
                            color: colors.gray900,
          }}
        />
      </Stack>

      <Typography variant="body2" sx={{ color: colors.gray500, mb: 2, flexGrow: 0 }}>
        {product.tagline}
      </Typography>

      <Box component="ul" sx={{ m: 0, pl: 2, mb: 2, flexGrow: 1 }}>
        {product.keyCapabilities.map((cap) => (
          <Typography
            component="li"
            variant="body2"
            key={cap}
            sx={{ color: colors.gray700, mb: 0.75 }}
          >
            {cap}
          </Typography>
        ))}
      </Box>

      <Typography variant="caption" sx={{ color: colors.gray700, fontWeight: 600, mb: 2, display: 'block' }}>
        Primary buyer: {product.buyerPersona}
      </Typography>

      <Button
        component={RouterLink}
        to={product.route}
        variant="outlined"
        color="primary"
        size="small"
        sx={{ alignSelf: 'flex-start' }}
      >
        Explore {product.name}
      </Button>
    </Box>
  );
}
