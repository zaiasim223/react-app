import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Dashboard = Loadable({ loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/dashboard'), loading: Loading });
const User = Loadable({ loader: () => import(/*webpackChunkName:'User'*/'@/views/user'), loading: Loading });
const Song = Loadable({ loader: () => import(/*webpackChunkName:'User'*/'@/views/song'), loading: Loading });
const News = Loadable({ loader: () => import(/*webpackChunkName:'User'*/'@/views/news'), loading: Loading });
const Quote = Loadable({ loader: () => import(/*webpackChunkName:'User'*/'@/views/quote'), loading: Loading });
const Book = Loadable({ loader: () => import(/*webpackChunkName:'User'*/'@/views/book'), loading: Loading });
const Movie = Loadable({ loader: () => import(/*webpackChunkName:'User'*/'@/views/movie'), loading: Loading });
const Reward = Loadable({ loader: () => import(/*webpackChunkName:'User'*/'@/views/reward'), loading: Loading });


export default [
  { path: "/dashboard", component: Dashboard, roles: ["admin", "editor", "guest"] },
  { path: "/user", component: User, roles: ["admin"] },
  { path: "/song", component: Song, roles: ["admin"] },
  { path: "/movie", component: Movie, roles: ["admin"] },
  { path: "/book", component: Book, roles: ["admin"] },
  { path: "/quote", component: Quote, roles: ["admin"] },
  { path: "/news", component: News, roles: ["admin"] },
  { path: "/reward", component: Reward, roles: ["admin"] },


];
