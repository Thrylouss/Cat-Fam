import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import MatchesPage from "./pages/MatchesPage/MatchesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProtectedRoute from "./utils/ProtectedRoute";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage.jsx";

const routes = createBrowserRouter([
    {
        path: "/auth",
        element: <AuthPage />,
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "matches",
                element: (
                    <ProtectedRoute>
                        <MatchesPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "notifications",
                element: (
                    <ProtectedRoute>
                        <NotificationsPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

export default routes;
