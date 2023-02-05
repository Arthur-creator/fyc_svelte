<!--and then use the user data to display the user name in the home page-->
<script>
    import { login } from "../stores/UserStore";
    let username = "";
    let password = "";

    const handleSubmit = () => {
        login({username, password});
    };
</script>

<!--create login page in svelte with a form and send to this url : localhost:3000/login-->
<!--and get the reponse from the same url-->
<!--and then redirect to the home page-->
<!--and then get the token from the response and store it in the local storage-->
<!--and then use the token to get the user data from the server-->
<!--and then store the user data in the local storage-->


<div>
    <h1 class="text-4xl mb-10">Login</h1>
    <form
        class="bg-white p-6 rounded-lg shadow-md"
        on:submit|preventDefault={handleSubmit}
    >
        <h2 class="text-lg font-medium mb-4">Connexion</h2>
        <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2" for="email">
                Adresse email
            </label>
            <input
                class="w-full border border-gray-400 p-2 rounded-lg"
                type="email"
                id="email"
                name="username"
                bind:value={username}
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
                Connexion
            </button>
        </div>
    </form>
</div>
