<script>
    import Login from "./Pages/Login.svelte";

    import {Router, Route, navigate} from "svelte-navigator";
    import Home from "./Pages/Home.svelte";
    import Nav from "./Pages/Nav.svelte";
    import Blogs from "./Pages/Blogs.svelte";
    import Blog from "./Pages/Blog.svelte";

    let url = "";

    if (!localStorage.getItem("token")) {
        navigate('/login');
    }
</script>

<main>
    <Nav/>
    <Router url="{url}">
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/blogs" component={Blogs}/>
        <Route path="/blogs/:id" component={Blog}/>
    </Router>
</main>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

</style>
