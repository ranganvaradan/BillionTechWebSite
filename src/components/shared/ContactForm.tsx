import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { colors } from '@/theme/tokens';
import { companyContact } from '@/data/company';

const productOptions = [
  'Flow P2P',
  'Flow O2C',
  'SCF',
  'Loan Origination System',
  'Multiple',
] as const;

const companyTypes = [
  'Manufacturer',
  'Distributor',
  'Bank',
  'NBFC',
  'Fintech',
  'Other',
] as const;

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  productInterest: string;
  companyType: string;
  message: string;
}

const empty: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  country: 'India',
  productInterest: '',
  companyType: '',
  message: '',
};

export function ContactForm() {
  const [params] = useSearchParams();
  const intent = params.get('intent');
  const [form, setForm] = useState<FormState>({
    ...empty,
    message: intent === 'demo' ? 'I would like to request a demo.' : '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const heading = useMemo(
    () => (intent === 'demo' ? 'Request a Demo' : 'Talk to Us'),
    [intent],
  );

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.company.trim()) next.company = 'Company is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Valid business email is required';
    }
    if (!form.phone.trim()) next.phone = 'Phone is required';
    if (!form.country.trim()) next.country = 'Country is required';
    if (!form.productInterest) next.productInterest = 'Select a product interest';
    if (!form.companyType) next.companyType = 'Select a company type';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('[BillionTech contact — local only]', form);
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Alert
        severity="success"
        sx={{
          backgroundColor: colors.successLight,
          color: colors.gray900,
          border: `1px solid ${colors.success}`,
          alignItems: 'flex-start',
        }}
      >
        <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Thank you — we received your details.</Typography>
        <Typography variant="body2">
          No live submission in v1. In development, your message is logged locally only. You can also
          reach {companyContact.name} at {companyContact.email}
          {companyContact.phone ? ` or ${companyContact.phone}` : ''}.
        </Typography>
      </Alert>
    );
  }

  const field = (key: keyof FormState) => ({
    value: form[key],
    error: Boolean(errors[key]),
    helperText: errors[key],
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Typography variant="h5" sx={{ mb: 1, fontSize: '1.35rem' }}>
        {heading}
      </Typography>
      <Typography variant="body2" sx={{ color: colors.gray500, mb: 3 }}>
        Tell us about your organisation and product interest. We will follow up for a scoped pilot
        conversation.
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label="Name" fullWidth required {...field('name')} />
          <TextField label="Company" fullWidth required {...field('company')} />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label="Business email" type="email" fullWidth required {...field('email')} />
          <TextField label="Phone" fullWidth required {...field('phone')} />
        </Stack>
        <TextField label="Country" fullWidth required {...field('country')} />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth required error={Boolean(errors.productInterest)}>
            <InputLabel id="product-interest-label">Product interest</InputLabel>
            <Select
              labelId="product-interest-label"
              label="Product interest"
              value={form.productInterest}
              onChange={(e) => setForm((f) => ({ ...f, productInterest: e.target.value }))}
            >
              {productOptions.map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </Select>
            {errors.productInterest && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                {errors.productInterest}
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth required error={Boolean(errors.companyType)}>
            <InputLabel id="company-type-label">Company type</InputLabel>
            <Select
              labelId="company-type-label"
              label="Company type"
              value={form.companyType}
              onChange={(e) => setForm((f) => ({ ...f, companyType: e.target.value }))}
            >
              {companyTypes.map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </Select>
            {errors.companyType && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                {errors.companyType}
              </Typography>
            )}
          </FormControl>
        </Stack>
        <TextField
          label="Message (optional)"
          fullWidth
          multiline
          minRows={3}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
        <Button type="submit" variant="contained" color="primary" size="large" sx={{ alignSelf: 'flex-start' }}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
