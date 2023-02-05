<script>
    export let title;
    export let handleSubmit;
    export let closeDialog;
    export let fields;
    export let id;
    export let table;

    let currentBlog = {};
    console.log(id)
    console.log(table)
        fetch('http://localhost:3001/'+ table +'/' + id, {
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
                } else {
                    currentBlog = channel;
                }
            })

</script>

<div class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full taille_min">
    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            on:click={closeDialog}>close
    </button>
    <form on:submit|preventDefault={handleSubmit}>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            {title}
        </h3>
        {#each fields as field}
            <div class="mt-2">
                <div class="mt-1">
                    <label class="block text-sm font-medium leading-5 text-gray-700">
                        {field.label}
                    </label>
                    <div class="mt-1 rounded-md shadow-sm">
                        <input bind:value={currentBlog.name} name={fields.name} id={fields.name} type="text" required
                               class="block w-full px-3 py-2 rounded-md placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"/>
                    </div>
                </div>
            </div>
        {/each}
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


<style>
    .taille_min {
        min-width: 600px;
    }
</style>