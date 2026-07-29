import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import type { CompetitiveRow } from '@/data/products';
import { colors } from '@/theme/tokens';

interface CompetitiveTableProps {
  columns: string[];
  rows: CompetitiveRow[];
}

export function CompetitiveTable({ columns, rows }: CompetitiveTableProps) {
  return (
    <TableContainer
      sx={{
        border: `1px solid ${colors.gray200}`,
        overflowX: 'auto',
      }}
    >
      <Table size="small" aria-label="Competitive comparison">
        <TableHead>
          <TableRow sx={{ backgroundColor: colors.gray900 }}>
            <TableCell
              sx={{
                color: colors.white,
                fontWeight: 600,
                minWidth: 200,
                borderBottom: 'none',
                py: 2,
              }}
            >
              Capability
            </TableCell>
            {columns.map((col, i) => (
              <TableCell
                key={col}
                sx={{
                  color: i === 0 ? colors.primary : 'rgba(255,255,255,0.85)',
                  fontWeight: 600,
                  minWidth: 140,
                  borderBottom: 'none',
                  py: 2,
                }}
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={row.capability}
              sx={{
                backgroundColor: rowIndex % 2 === 0 ? colors.white : colors.gray50,
              }}
            >
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: colors.gray900,
                  borderColor: colors.gray200,
                  py: 2,
                  verticalAlign: 'top',
                }}
              >
                {row.capability}
              </TableCell>
              <TableCell
                sx={{
                  color: colors.primaryHover,
                  fontWeight: 600,
                  borderColor: colors.gray200,
                  py: 2,
                  verticalAlign: 'top',
                }}
              >
                {row.billiontech}
              </TableCell>
              {columns.slice(1).map((col) => (
                <TableCell
                  key={col}
                  sx={{
                    color: colors.gray700,
                    borderColor: colors.gray200,
                    py: 2,
                    verticalAlign: 'top',
                  }}
                >
                  {row.competitors[col] ?? '—'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ px: 2, py: 1.5, backgroundColor: colors.gray50, borderTop: `1px solid ${colors.gray200}` }}>
        <Typography variant="caption" sx={{ color: colors.gray500 }}>
          “—” = not claimed here from deck source data. Job-work gap vs. SAP Ariba / Zycus / Coupa is
          stated explicitly in BillionTech sales material.
        </Typography>
      </Box>
    </TableContainer>
  );
}
