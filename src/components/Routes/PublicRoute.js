import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isLogedIn } from '../../redux/auth/AuthSelector';

const PublicRoute = ({ restricted, component: Component, ...props }) => {
  const isAuth = useSelector(isLogedIn);

  return isAuth && restricted ? (
    <Navigate to="/transactions" />
  ) : (
    <Component {...props} />
  );
};

export default PublicRoute;
