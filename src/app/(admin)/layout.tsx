'use client';

import { AuthGuard, RoleBasedGuard } from '@/auth';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <RoleBasedGuard hasContent roles={['admin']}>
        <div className='min-h-screen'>{children}</div>
      </RoleBasedGuard>
    </AuthGuard>
  );
};

export default AdminLayout;
