<script>
    import {Link, navigate, Router} from "svelte-navigator";

    let userConnected = false;
    if (localStorage.getItem("token")) {
        userConnected = true;
    }

    const logout = () => {
        localStorage.removeItem("token");
        userConnected = false;
        navigate('/login');
    }

</script>

<style >
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    nav {
        @apply bg-gray-900 text-white py-3;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        width: 100%;
        margin-bottom: 40px;
    }

</style>
<Router>
    <nav class="bg-gray-900 text-white py-3">
        <div class="flex justify-between items-center max-w-4xl mx-auto">
            <Link to="/" class="font-bold text-xl mx-5">Accueil</Link>
            <div>
                {#if userConnected}
                    <button on:click={logout} class="font-bold text-xl mx-5">Déconnexion</button>
                {:else}
                    <Link to="/login" class="font-bold text-xl mx-5">Connexion</Link>
                {/if}
                <Link to="/blogs" class="font-bold text-xl mx-5">Blogs</Link>
            </div>
        </div>
    </nav>
</Router>
