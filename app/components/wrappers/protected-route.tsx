import { Navigate, useLocation } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import { Loader } from '../layout/loader';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
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

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}