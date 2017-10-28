import HomePage from './containers/HomePage/HomePage.jsx';
import ListiclePage from './containers/Listicle/ListiclePage.jsx';




const routes = {
  // base component (wrapper for the whole application).
  childRoutes: [


    {
      path: '/',
      component: HomePage
    },

  ]
};

export default routes;
