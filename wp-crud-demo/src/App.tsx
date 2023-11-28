import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from './components/AuthPage/AuthPage';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';

function App() {
	return (
		<Routes>
			<Route path='/auth' element={<AuthPage />} />
			{/* TODOTAB: Look into where to add the navbar */}
			<Route path='/' element={<HomePage />} />
			{/* TODOTAB: Look into :id vs query param */}
			<Route path='/profile/:id' element={<ProfilePage />} />
		</Routes>
	)
}

export default App;
