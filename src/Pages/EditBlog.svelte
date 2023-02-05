<div class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full taille_min">
    <form on:submit|preventDefault={() => onSubmit()}>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            Modifier le blog
        </h3>
            <div class="mt-2">
                <div class="mt-1">
                    <label class="block text-sm font-medium leading-5 text-gray-700">
                        Nom
                    </label>
                    <div class="mt-1 rounded-md shadow-sm">
                        <input bind:value={currentBlog.name} name="name" id="name" type="text" required
                               class="block w-full px-3 py-2 rounded-md placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"/>
                    </div>
                </div>
            </div>
        <div class="mt-6">
          <span class="block w-full rounded-md shadow-sm">
            <button type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              Envoyer
            </button>
          </span>
        </div>
    </form>
</div>

<script>
    import { onMount } from 'svelte';
    import {navigate} from "svelte-navigator";

    let currentBlog = {};

    const id = window.location.pathname.split('/')[3];

    onMount(async () => {
        console.log(id)
        fetch('http://localhost:3001/channels/'+ id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(channel => {
                if (channel.statusCode) {
                    return;
                }else {
                    currentBlog = channel;
                }})

    });


    const onSubmit = () => {
        fetch('http://localhost:3001/channels/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: currentBlog.name,
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    return;
                }else {
                    navigate('/blogs')
                }
            })
    }

</script>