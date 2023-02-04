<script>
    export let title;
    export let handleSubmit;
    export let closeDialog;
    export let fields;

</script>

<div class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
    <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>

        <div class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <button on:click={closeDialog}>close</button>
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
                                <input bind:value={fields.value} name={fields.name} id={fields.name} type="text" required class="block w-full px-3 py-2 rounded-md placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"/>
                            </div>
                        </div>
                    </div>
                {/each}
                <div class="mt-6">
          <span class="block w-full rounded-md shadow-sm">
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              Submit
            </button>
          </span>
                </div>
            </form>
        </div>
    </div>
</div>