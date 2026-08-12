import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from '@/layouts/AdminLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AdminPlaceholderPage } from '@/pages/admin/AdminPlaceholderPage';
import { HomePage } from '@/pages/public/HomePage';

export const router = createBrowserRouter([
  { path: '/', element: <PublicLayout />, children: [{ index: true, element: <HomePage /> }] },
  { path: '/admin', element: <AdminLayout />, children: [{ index: true, element: <AdminPlaceholderPage /> }] },
]);
