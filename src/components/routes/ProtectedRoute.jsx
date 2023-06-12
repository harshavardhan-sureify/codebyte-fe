import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../features/User.reducer";

const ProtectedRoute = () => {
    const authenticated = useSelector(isLoggedIn);
    return authenticated ? <Outlet /> : <Navigate to="/" replace />;
};
export default ProtectedRoute;
