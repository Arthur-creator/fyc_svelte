<script>
    import { register } from "../stores/UserStore";
    let email = "";
    let password = "";
    let nickname = "";

    const handleSubmit = () => {
        console.log("submit");
        register({email, password, nickname});
    };
</script>

<div>
    <h1 class="text-4xl mb-10">Login</h1>
    <form
        class="bg-white p-6 rounded-lg shadow-md"
        on:submit|preventDefault={handleSubmit}
    >
        <h2 class="text-lg font-medium mb-4">Inscription</h2>
        <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2" for="email">
                Adresse email
            </label>
            <input
                class="w-full border border-gray-400 p-2 rounded-lg"
                type="email"
                id="email"
                name="username"
                bind:value={email}
            />
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2" for="email">
                Pseudo
            </label>
            <input
                class="w-full border border-gray-400 p-2 rounded-lg"
                type="text"
                id="nickname"
                name="nickname"
                bind:value={nickname}
            />
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2" for="password">
                Mot de passe
            </label>
            <input
                class="w-full border border-gray-400 p-2 rounded-lg"
                type="password"
                id="password"
                name="password"
                bind:value={password}
            />
        </div>
        <div class="flex items-center justify-center">
            <button
                class="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600"
                type="submit"
            >
                S'inscrire
            </button>
        </div>
    </form>
</div>
