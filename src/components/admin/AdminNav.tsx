import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Stack, Typography } from '@mui/material';

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'News', href: '/admin/news' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Employees', href: '/admin/employees' },
];

export const AdminNav: React.FC = () => {
  const router = useRouter();

  const isActive = (href: string) => router.pathname.startsWith(href);

  return (
    <Box
      sx={{
        mb: 3,
        py: 2,
        px: 2,
        borderRadius: 2,
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mr: 1 }}>
          Admin:
        </Typography>

        {navItems.map((item) => (
          <Link key={item.href} href={item.href} passHref>
            <Button
            component="a"
              size="small"
              sx={{
                textTransform: 'none',
                textDecoration: 'none',
                fontWeight: isActive(item.href) ? 700 : 400,
                backgroundColor: isActive(item.href) ? '#e5e7eb' : 'transparent',
              }}
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </Stack>

      <Link href="/" passHref>
        <Button
          component="a"
          size="small"
          variant="outlined"
          sx={{ textTransform: 'none', textDecoration: 'none' }}
        >
          Back to website
        </Button>
      </Link>
    </Box>
  );
};
