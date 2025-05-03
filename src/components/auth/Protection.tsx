'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "@/store/index";


export function AdminProtection(Component: React.ComponentType) {
  return function ProtectedAdminPage(props: any) {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
      if (!user || user.role !== 'admin') {
        router.push('/login');
      }
    }, [user]);

    if (!user || user.role !== 'admin') {
      return <div className="text-center mt-20">Redirecting...</div>;
    }

    return <Component {...props} />;
  };
}

export function UserProtection(Component: React.ComponentType) {
  return function ProtectedUserPage(props: any) {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
      if (!user || user.role !== 'user') {
        router.push('/login');
      }
    }, [user]);

    if (!user || user.role !== 'user') {
      return <div className="text-center mt-20">Redirecting...</div>;
    }

    return <Component {...props} />;
  };
}
