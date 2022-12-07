import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isLogedIn } from '../../redux/auth/AuthSelector';

const PrivateRoute = ({ component: Component, ...props }) => {
  const isAuth = useSelector(isLogedIn);

  return isAuth ? <Component {...props} /> : <Navigate to="/" />;
};

export default PrivateRoute;
