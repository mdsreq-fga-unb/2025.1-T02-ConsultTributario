'use client';

import { AuthGuard } from '@/auth';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <div className='min-h-screen bg-gray-50'>{children}</div>
    </AuthGuard>
  );
};

export default ProtectedLayout;
