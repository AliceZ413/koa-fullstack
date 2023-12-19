import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom';
import Login from './routes/login';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader() {
      // Our root route always provides the user, if logged in
      return { user: '' };
    },
    errorElement: <RootErrorBoundary />,
    Component: Layout,
    children: [
      {
        index: true,
        Component: PublicPage,
      },
    ],
  },
  {
    id: 'login',
    path: '/login',
    Component: Login,
  },
]);

export function RootErrorBoundary() {
  let error = useRouteError() as Error;
  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = '/')}>
        Click here to reload the app
      </button>
    </div>
  );
}

function PublicPage() {
  return <div>PublicPage</div>;
}

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <div className='App'>
      <RouterProvider
        router={router}
        fallbackElement={<p>loading...</p>}
      ></RouterProvider>
    </div>
  );
}

export default App;
