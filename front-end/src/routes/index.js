import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
// TODO: Uncomment when authtication is needed
// import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes]);
}
