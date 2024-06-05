// npm
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
// Styles
import "./style.scss";
import Admin from "./pages/Admin";

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
        path: "/solve/:id",
        element: <Solve />,
      },
      {
        path: "/leaderboard",
        element: <Protect children={<Leaderboard />} />,
      },
      {
        path: "/admin",
        element: <Protect children={<Admin />} />,
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
