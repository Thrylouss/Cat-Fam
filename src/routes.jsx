import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import MatchesPage from "./pages/MatchesPage/MatchesPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />, // Стартовая страница — регистрация
    },
    {
        path: "/auth",
        element: <AuthPage />,
    },
    {
        path: "/matches",
        element: <MatchesPage />,
    },
    {
        path: "/profile",
        element: <ProfilePage />,
    },
]);

export default router


