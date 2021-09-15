import Index from '../views/Index.vue'

const routes = [
    {
        path: '/',
        component: Index,
        children: [
            {
                path: '/home',
                name: 'Home',
                component: function () {
                    return import('../views/Home')
                }
            },
            {
                path: '/auth',
                name: 'Auth',
                component: function () {
                    return import('../views/Auth')
                }
            }
        ]
    },
    {
        path: '*',
        component: function () {
            return import('../views/Error404.vue')
        }
    }
];

export default routes