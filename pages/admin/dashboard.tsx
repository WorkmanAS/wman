// pages/admin/dashboard.tsx
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import basicAuth from '../../src/lib/basicAuth';
import { FiPlusCircle, FiFolderPlus, FiImage } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import React from 'react';

export default function AdminDashboard() {
  const cards: {
    href: string;
    Icon: IconType;
    title: string;
    description: string;
    iconColor: string;
  }[] = [
    {
      href: '/admin/news',
      Icon: FiPlusCircle,
      title: 'Add News',
      description: 'Post a new news item with title, description, and optional image.',
      iconColor: 'text-blue-600',
    },
    {
      href: '/admin/projects/new',
      Icon: FiFolderPlus,
      title: 'Add New Project',
      description: 'Create a new project entry with name, summary, and images.',
      iconColor: 'text-green-600'
    },
    {
      href: '/admin/projects/photos',
      Icon: FiImage,
      title: 'Add Photos to Existing Project',
      description: 'Upload photos to an already created project.',
      iconColor: 'text-putple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-10">Admin Dashboard</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ href, Icon, title, description, iconColor }) => (
            <Link key={title} href={href} passHref>
              <a className="block bg-white rounded-xl shadow hover:shadow-lg transition p-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                    {React.createElement(Icon as React.FC<{ className?: string }>, {
                        className: `w-8 h-8 ${iconColor}`,
                        })}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 m-0 p-0">{title}</h2>
                  </div>
                  <p className="text-gray-600 text-sm m-0">{description}</p>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
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
