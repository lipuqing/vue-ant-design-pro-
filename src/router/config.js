export const constantRouterMap = [{
    path: '/',
    type:'menu',
    key:0,
    name:'歌手列表',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/table')
},
{
    path: '/about',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/About')
},
{
    path: '/songer',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/table')
},
{
    path: '/dyman',
    type:'menu',
    key:1,
    name:'电音人列表',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/dyman')
},
{
    path: '/404',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/404')
}
];
