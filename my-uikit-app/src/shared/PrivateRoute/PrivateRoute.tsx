import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = ({component:Component,isAuthenticated, ...rest}) => {
return isAuthenticated ? <Outlet />:<Navigate to={'/login'}/>
};

export default PrivateRoute;