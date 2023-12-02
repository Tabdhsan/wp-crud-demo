import { useCookies } from 'react-cookie';
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoutes = () => {
	const [cookies] = useCookies();
	const isAuthenticated =
		!!cookies[import.meta.env.REACT_APP_MAIN_COOKIE ?? ''];
	return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};

export default PublicRoutes;
