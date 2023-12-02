import { useCookies } from 'react-cookie';
import { Outlet, Navigate } from 'react-router-dom';
import { MAIN_COOKIE } from '../../constants';

const PublicRoutes = () => {
	const [cookies] = useCookies();
	const isAuthenticated = !!cookies[MAIN_COOKIE ?? ''];
	return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};

export default PublicRoutes;
