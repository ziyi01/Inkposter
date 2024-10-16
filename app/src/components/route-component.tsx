import { UserModel } from "../userModel";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

interface RouteProps {
    model: UserModel;
}

// Player route: Redirects to homepage if user is not in a room
export const PlayerRoute: React.FC<RouteProps> = ({model}) => {
    console.log(model.roomId);
    return model.roomId !== '' ? <Outlet /> : <Navigate to="/homepage" />;
};

// Host route: Redirects to homepage if user is not a host
export const HostRoute: React.FC<RouteProps> = ({model}) => {
    console.log(model.host);
    return model.host ? <Outlet/> : <Navigate to="/homepage" />;
};

// Protected route: Redirects to login if user is not authenticated
export const ProtectedRoute = () => {
    const isAuthenticated = Cookies.get('isAuthenticated') === 'true'; // check auth status
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  
  };