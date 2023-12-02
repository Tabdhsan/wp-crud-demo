import { useCookies } from 'react-cookie';
import { Outlet, Navigate } from 'react-router-dom';

// TODOTAB: Move process.env stuff to a constants file
const ProtectedRoutes = () => {
	const [cookies] = useCookies();
	const isAuthenticated =
		!!cookies[import.meta.env.VITE_APP_MAIN_COOKIE ?? ''];
	return isAuthenticated ? <Outlet /> : <Navigate to='/auth' />;
};

export default ProtectedRoutes;
