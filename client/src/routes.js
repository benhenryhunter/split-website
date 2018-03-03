import HomePage from './containers/HomePage/HomePage.jsx';
import Admin from './containers/Admin/Admin.jsx';

const routes = {
  // base component (wrapper for the whole application).
  childRoutes: [


    {
      path: '/',
      component: HomePage
    },
    {
    	path:'/admin12345678',
    	component:Admin,
    }

  ]
};

export default routes;
