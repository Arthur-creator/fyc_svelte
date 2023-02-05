<script>
    import Router from "./lib/app/Router.svelte";
    import Nav from "./lib/Nav.svelte";
</script>

<main>
    <Nav />
    <Router />
</main>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
