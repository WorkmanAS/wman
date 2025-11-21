// pages/admin/dashboard.tsx
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import basicAuth from '../../src/lib/basicAuth';
import { Box, Typography, Stack, ButtonBase } from '@mui/material';
import type { IconType } from 'react-icons';
import { FiPlusCircle, FiFolderPlus, FiUser } from 'react-icons/fi';
import React from 'react';
import { AdminNav } from '../../src/components/admin/AdminNav';

const FiPlusCircleIcon = FiPlusCircle as React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
const FiFolderPlusIcon = FiFolderPlus as React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
const FiUserIcon = FiUser as React.ComponentType<{ size?: number; style?: React.CSSProperties }>;


type CardItem = {
  href: string;
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  title: string;
  description: string;
  iconColor: string;
};

export default function AdminDashboard() {
const cards: CardItem[] = [
  {
    href: '/admin/news',
    Icon: FiPlusCircleIcon,
    title: 'Manage News',
    description: 'Add, edit, or delete news items.',
    iconColor: '#1e40af',
  },
  {
    href: '/admin/projects',
    Icon: FiFolderPlusIcon,
    title: 'Manage Projects',
    description: 'Create, update or delete projects and assign categories.',
    iconColor: '#047857',
  },
  {
    href: '/admin/employees',
    Icon: FiUserIcon,
    title: 'Manage Employees',
    description: 'Add, edit, or remove employees from contact page.',
    iconColor: '#6b21a8',
  },
];


  return (
    <Box minHeight="100vh" bgcolor="#f3f4f6" py={6} px={2}>
      <Box maxWidth="md" mx="auto">
        <AdminNav />
        <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
          Admin Dashboard
        </Typography>

        <Stack spacing={4}>
          {cards.map(({ href, Icon, title, description, iconColor }) => (
            <Link key={title} href={href} passHref>
              <ButtonBase
                component="a"
                sx={{
                  width: '100%',
                  textAlign: 'left',
                  display: 'block',
                  p: 2,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#e5e7eb', // Tailwind gray-200
                  },
                }}
              >
                <Stack spacing={1}>
<Box display="flex" alignItems="center">
  {React.createElement(Icon, {
    size: 20,
    style: { color: iconColor, marginRight: 8 },
  })}
  <Typography variant="subtitle1" fontWeight="bold">
    {title}
  </Typography>
</Box>
                  <Typography variant="body2" color="text.primary">
                    {description}
                  </Typography>
                </Stack>
              </ButtonBase>
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const authorized = basicAuth(req, res);
  if (!authorized) {
    return { props: {} };
  }
  return { props: {} };
};
