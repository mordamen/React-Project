import { Navigate, Route, Routes } from "react-router-dom";

import ROUTES from "./ROUTES";

import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import FavoritesPage from "../pages/MyFavorites";
import MyCardsPage from "../pages/My Cards";
import SandboxPage from "../pages/SandboxPage/SandboxPage";
import HarryPotterPage from "../pages/SandboxPage/HarryPotterPage";
import UseMemo from "../pages/SandboxPage/UseMemo";
import ReRenderPage from "../pages/SandboxPage/ReRenderPage";
import AboutPage from "../pages/AboutPage";
import SuperProtectedRoute from "./Protected Routes/SuperProtectedRoute";
import ProtectedRoute from "./Protected Routes/ProtectedRoute";
// import CRMPage from "../pages/CRMPage";

const Router = () => {
    return (
        <Routes>

            {/* pages for all */}
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />

            {/* pages for users only */}
            <Route path={ROUTES.PROFILE} element={
                <ProtectedRoute element={<ProfilePage />} />} />
            <Route path={ROUTES.MYFAVS} element={
                <ProtectedRoute element={<FavoritesPage />} />} />

            {/* pages for biz users only */}
            <Route path={ROUTES.MYCARDS} element={
                <SuperProtectedRoute
                    isBiz={true} isAdmin={false} element={<MyCardsPage />} />} />

            {/* pages for admins only */}
            {/* <Route path={ROUTES.CRM} element={
                <SuperProtectedRoute
                    isBiz={false} isAdmin={true} element={<CRMPage />} />} /> */}
            <Route path={ROUTES.SANDBOX} element={
                <SuperProtectedRoute
                    isBiz={false} isAdmin={true} element={<SandboxPage />} />}>
                <Route path={"harrypotter"} element={<HarryPotterPage />} />
                <Route path={"usememo"} element={<UseMemo />} />
                <Route path={"rerender"} element={<ReRenderPage />} />
            </Route>

            {/* 404 page */}
            <Route path="*" element={<span><h1>404</h1><p>Opsss... page not found</p></span>} />
        </Routes>
    )
}

export default Router;