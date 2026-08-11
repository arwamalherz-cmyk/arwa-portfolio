import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from '@/layouts/AdminLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AdminPlaceholderPage } from '@/pages/admin/AdminPlaceholderPage';
import { PortfolioPlaceholderPage } from '@/pages/public/PortfolioPlaceholderPage';

export const router = createBrowserRouter([
  { path: '/', element: <PublicLayout />, children: [{ index: true, element: <PortfolioPlaceholderPage /> }] },
  { path: '/admin', element: <AdminLayout />, children: [{ index: true, element: <AdminPlaceholderPage /> }] },
]);
