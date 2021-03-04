import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import CJ1 from '@/components/CJ1/IndexPage'
import CJ2 from '@/components/CJ2/IndexPage'
import CJ2_1 from '@/components/CJ2/CJ2_1'
import CJ2_2 from '@/components/CJ2/CJ2_2'
import CJ2_3 from '@/components/CJ2/CJ2_3'
import CJ2_4 from '@/components/CJ2/CJ2_4'
import CJ3 from '@/components/CJ3/IndexPage'
import Result from '@/components/Result'
import AddInfo from '@/components/CJ3/AddInfo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/CJ1',
            name: 'CJ1',
            component: CJ1
        },
        {
            path: '/CJ2',
            name: 'CJ2',
            component: CJ2
        },
        {
            path: '/CJ2_1',
            name: 'CJ2_1',
            component: CJ2_1
        },
        {
            path: '/CJ2_2',
            name: 'CJ2_2',
            component: CJ2_2
        },
        {
            path: '/CJ2_3',
            name: 'CJ2_3',
            component: CJ2_3
        },
        {
            path: '/CJ2_4',
            name: 'CJ2_4',
            component: CJ2_4
        },
        {
            path: '/CJ3',
            name: 'CJ3',
            component: CJ3
        },
        {
            path: '/Result',
            name: 'Result',
            component: Result
        },
        {
            path: '/Index',
            name: 'Index',
            component: Index
        },
        {
            path: '/AddInfo',
            name: 'AddInfo',
            component: AddInfo
        }
    ]
})
