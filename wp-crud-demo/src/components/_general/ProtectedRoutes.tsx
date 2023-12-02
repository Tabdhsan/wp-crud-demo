import { useCookies } from 'react-cookie';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
	const [cookies] = useCookies();
	const isAuthenticated = !!cookies['wp-crud-demo-cookie'];
	return isAuthenticated ? <Outlet /> : <Navigate to='/auth' />;
};

export default ProtectedRoutes;
