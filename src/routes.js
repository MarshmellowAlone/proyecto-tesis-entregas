import Home from "./views/Home";
import User from "./views/User";
import Detail from "./views/Detail";
import MapPkg from "./views/MapPkg";

const router = [
   {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
         next()
      }
   },
   {
      path: '/user/:user',
      name: 'user',
      component: User,
      children: [
         {
            path: 'detail/:pkg',
            name: 'detail',
            component: Detail,
            children: [
               {
                  path: 'map',
                  name: 'map',
                  component: MapPkg
               }
            ]
         }
      ]
   },
]

export default router;