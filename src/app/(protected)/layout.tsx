'use client';

import { AuthGuard } from '@/auth';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <div className='min-h-screen'>{children}</div>
    </AuthGuard>
  );
};

export default ProtectedLayout;
