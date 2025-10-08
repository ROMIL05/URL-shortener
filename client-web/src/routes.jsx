import { createBrowserRouter, useParams } from 'react-router-dom';
import { loginLoader, verifyLoader } from './loaders/verify.loader';
import ErrorElement from './components/ErrorElement';
import HomePage from './pages/user/HomePage';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/user',
		errorElement: <ErrorElement />,
		children: [{ path: 'generate-url', element: <HomePage /> }],
	},

	{
		path: '*',
		element: <ErrorElement />,
	},
]);

export default routes;
