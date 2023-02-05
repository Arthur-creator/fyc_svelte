<script>
    import { isLogged, logout } from "../stores/UserStore";
    import { navigate } from "../stores/RoutesStore";
    import Navigate from "./app/Navigate.svelte";

    let userConnected = false;
    isLogged.subscribe((value) => {
        userConnected = value;
    });

</script>

<nav class="bg-gray-900 text-white py-3">
    <div class="flex justify-between items-center max-w-4xl mx-auto">
        <Navigate name="home">Accueil</Navigate>
        <div>
            {#if userConnected}
                <button on:click={() => logout()} class="font-bold text-xl mx-5"
                    >Déconnexion</button
                >
            {:else}
                <Navigate name="login">Connexion</Navigate>
                <Navigate name="register">Inscription</Navigate>
            {/if}
            <Navigate name="blogs">Blogs</Navigate>
            <Navigate name="profile">Profil</Navigate>
        </div>
    </div>
</nav>

<style>
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
