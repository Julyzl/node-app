import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const route = new Router({
    mode: "history",
    linkActiveClass: "active",
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
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: () =>
                import ("../components/dashboard.vue")
        },
        {
            path: "/create-profile",
            name: "create-profile",
            component: () =>
                import ("../components/CreateProfile")
        },
        {
            path: "/edit-profile",
            component: () =>
                import ("../components/EditProfile")
        },
        {
            path: "/add-experience",
            component: () =>
                import ("../components/AddExperience")
        },
        {
            path: "/add-education",
            component: () =>
                import ("../components/AddEducation")
        },
        {
            path: "/profiles",
            component: () =>
                import ("../components/Profiles")
        },
        {
            path: "/profile/:handle",
            component: () =>
                import ("../components/Profile/Profile")
        },
        {
            path: "/posts",
            component: () =>
                import ("../components/Posts/Posts")
        },
        {
            path: "/post/:id",
            component: () =>
                import ("../components/Posts/Post")
        }
    ]
});

// 全局守卫
route.beforeEach((to, from, next) => {
    const isLogin = localStorage.token ? true : false;

    if (to.path == "/login" || to.path == "/register" || to.path == "/") {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
});
export default route;