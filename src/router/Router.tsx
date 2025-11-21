// src/router/Router.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import ExplorerPage from '../pages/ExplorerPage';
import DetailPage from '../pages/DetailPage';
import NotFoundPage from '../pages/NotFoundPage';

import VersusPage from '../pages/VersusPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <ExplorerPage />,
      },
      {
        path: 'versus',
        element: <VersusPage />,
      },
      {
        path: 'champions/:championId',
        element: <DetailPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
