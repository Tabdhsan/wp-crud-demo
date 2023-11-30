import { Router } from 'express';
import { signin, signup } from '../controllers/authentication';
import {
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from '../controllers/users';
import { isAuthenticated, isAuthorized } from '../middleware';

// Defining the routes for the server

const router = Router();

const customRouter = (): Router => {
	router.post('/auth/signup', signup);
	router.post('/auth/signin', signin);
	router.get('/users', isAuthenticated, getAllUsers);
	router.delete('/users/:id', isAuthenticated, isAuthorized, deleteUser);
	router.get('/users/:id', isAuthenticated, getUserById);
	router.patch('/users/:id', isAuthenticated, isAuthorized, updateUser);
	return router;
};

export default customRouter;
