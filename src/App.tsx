//  npm
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// Pages
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Problems from "./pages/Problems";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Solve from "./pages/Solve";
import About from "./pages/About";
// Components
import NavBar from "./components/NavBar";
import Protect from "./components/Protect";

import "./style.scss";

const Layout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "/",
        element: <About />,
      },
      {
        path: "/profile/:username",
        element: <Protect children={<Profile />} />,
      },
      {
        path: "/problems",
        element: <Problems />,
      },
      {
        path: "/Solve/:id",
        element: <Solve />,
      },
      {
        path: "/Leaderboard",
        element: <Protect children={<Leaderboard />} />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const App = () => (
  <div className="app">
    <RouterProvider router={router} />
  </div>
);

export default App;
