import { Navigate, Outlet } from "react-router-dom";

function RotasPosLogin() {

    const isAuthenticated = localStorage.getItem("token") !== null;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default RotasPosLogin;
