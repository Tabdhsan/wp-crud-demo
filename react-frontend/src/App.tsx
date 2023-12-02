import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from './components/AuthPage/AuthPage';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ProtectedRoutes from './components/_general/ProtectedRoutes';
import PublicRoutes from './components/_general/PublicRoutes';

function App() {
	return (
		<Routes>
			<Route element={<ProtectedRoutes />}>
				<Route path='/' element={<HomePage />} />
				<Route path='/profile/:id' element={<ProfilePage />} />
			</Route>

			<Route element={<PublicRoutes />}>
				<Route path='/auth' element={<AuthPage />} />
			</Route>
		</Routes>
	);
}

export default App;
