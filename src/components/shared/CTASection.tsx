import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { colors } from '@/theme/tokens';

interface CTASectionProps {
  heading?: string;
  subheading?: string;
}

export function CTASection({
  heading = "Let's scope your pilot.",
  subheading = '6–7 weeks. One measurable outcome, agreed upfront.',
}: CTASectionProps) {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: colors.gray900,
        py: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{ color: colors.white, mb: 2, fontSize: { xs: '1.85rem', md: '2.35rem' } }}
          >
            {heading}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.75)', mb: 4, fontSize: '1.1rem' }}>
            {subheading}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              component={RouterLink}
              to="/contact?intent=demo"
              variant="contained"
              color="primary"
              size="large"
            >
              Request a Demo
            </Button>
            <Button
              component={RouterLink}
              to="/contact"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.45)',
                color: colors.white,
                '&:hover': {
                  borderColor: colors.white,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              Talk to Us
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
