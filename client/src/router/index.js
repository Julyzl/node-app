import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    linkActiveClass: 'active',
    routes: [{
            path: "*",
            redirect: "/"
        },
        {
            path: "/",
            name: "landing",
            component: () =>
                import ("../components/Landing.vue")
        },
        {
            path: "/login",
            name: "login",
            component: () =>
                import ("../components/login.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () =>
                import ("../components/register.vue")
        }
    ]
});