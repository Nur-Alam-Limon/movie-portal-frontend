// components/withAdminProtection.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "@/store/index";


export default function withAdminProtection(Component: React.ComponentType) {
  return function ProtectedAdminPage(props: any) {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        console.log("User", user)
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
