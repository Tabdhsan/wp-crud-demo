import { useCookies } from 'react-cookie';
import { Outlet, Navigate } from 'react-router-dom';
import { MAIN_COOKIE } from '../../contants';

const ProtectedRoutes = () => {
	const [cookies] = useCookies();
	const isAuthenticated = !!cookies[MAIN_COOKIE ?? ''];
	return isAuthenticated ? <Outlet /> : <Navigate to='/auth' />;
};

export default ProtectedRoutes;
