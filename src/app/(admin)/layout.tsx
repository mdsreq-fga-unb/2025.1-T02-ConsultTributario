'use client';

import { AuthGuard, RoleBasedGuard } from '@/auth';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <RoleBasedGuard hasContent roles={['admin', 'super_admin']}>
        <div className='min-h-screen bg-gray-50'>
          <div className='border-b border-gray-200 bg-white'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <div className='flex h-16 items-center justify-between'>
                <div className='flex items-center'>
                  <h1 className='text-xl font-semibold text-gray-900'>Painel Administrativo</h1>
                </div>
                <div className='flex items-center space-x-4'>
                  <span className='inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800'>
                    Admin
                  </span>
                </div>
              </div>
            </div>
          </div>
          <main className='py-8'>{children}</main>
        </div>
      </RoleBasedGuard>
    </AuthGuard>
  );
};

export default AdminLayout;
