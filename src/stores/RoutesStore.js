import { readable, writable, get } from "svelte/store";

import Home from "../Pages/Home.svelte";
import Blogs from "../Pages/Blogs.svelte";
import Login from "../Pages/Login.svelte";
import Blog from "../Pages/Blog.svelte";
import Profile from "../Pages/Profile.svelte";
import EditBlog from "../Pages/EditBlog.svelte";

export const route = writable({
    name: "home",
    component: Home,
    params: {},
});

export const routes = readable([{
    name: "home",
    component: Home,
    params: {},
    needAuth: false,
}, {
    name: "login",
    component: Login,
    params: {},
    needAuth: false,
}, {
    name: "blogs",
    component: Blogs,
    params: {},
    needAuth: true,
}, {
    name: "blog",
    component: Blog,
    params: {},
    needAuth: true,
}, {
    name: "profile",
    component: Profile,
    params: {},
    needAuth: true,
}, {
    name: "blog-edit",
    component: EditBlog,
    params: {},
    needAuth: true,
}])

export const navigate = (name, params = {}) => {
    const [targetRoute] = get(routes).filter((route) => route.name === name)
    console.log(targetRoute);
    route.set({ ...targetRoute, params });
};