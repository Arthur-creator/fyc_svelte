<script>
    import Login from "./Pages/Login.svelte";

    import {Router, Route, navigate} from "svelte-navigator";
    import Home from "./Pages/Home.svelte";
    import Nav from "./Pages/Nav.svelte";
    import Blogs from "./Pages/Blogs.svelte";
    import Blog from "./Pages/Blog.svelte";
    import Profile from "./Pages/Profile.svelte";
    import EditBlog from "./Pages/EditBlog.svelte";
    import {onMount} from "svelte";

    let url = "";

    onMount(() => {
        if (!localStorage.getItem("token")) {
            navigate('/login');
        }
    });

</script>

<main>
    <Nav/>
    {#if window.location.pathname !== '/'}
        <div class="cursor-pointer" on:click={() => window.history.back()}>
            <button class="text-white hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mb-5 border border-gray-400">Retour</button>
        </div>
    {/if}
    <Router url="{url}">
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/blogs" component={Blogs}/>
        <Route path="/blogs/:id" component={Blog}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/blogs/edit/:id" component={EditBlog}/>
    </Router>
</main>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
