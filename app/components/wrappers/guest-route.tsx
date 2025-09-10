import { Navigate, useLocation } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { Loader } from '../layout/loader';

interface GuestRouteProps {
    children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex flex-col h-screen items-center justify-center">
                <Loader size="lg" className="text-gray-500" />
                <p className="mt-4 text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!loading && user) {
        const redirectPath = (location.state as any)?.from?.pathname || "/";
        return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
}