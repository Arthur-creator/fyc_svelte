<script>

import Dialog from "../lib/Dialog.svelte";
import Blog from "./Blog.svelte";
import {navigate} from "svelte-navigator";
import FormAdd from "../lib/FormAdd.svelte";

let blogs = '';
let dialog;
let name = '';

fetch('http://localhost:3001/channels', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
})
.then(res => res.json())
.then(data => {
    if (data.statusCode) {
        alert(data.message);
        return;
    }else {
        blogs=data;
    }
})

function addBlog() {
    fetch('http://localhost:3001/channels', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            name: formFields.value,
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }else {
                blogs[blogs.length] = data;
                dialog.close();
            }
        })
}

let formFields = [
    {
        name: 'name',
        label: 'blog',
        type: 'text',
        value: '',
    }
]

const closeDialog = () => {
    dialog.close();
}

</script>

<div class="flex">
    <h1 class="text-2xl font-bold mb-4 mr-5">Liste des blogs</h1>
    <div on:click={() => dialog.showModal()} class="pointer-cursor">
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </div>
</div>

<Dialog bind:dialog on:close>
    <FormAdd closeDialog={closeDialog} fields={formFields} title={"Ajouter un blog"} handleSubmit={addBlog}/>
</Dialog>

<div class="flex flex-col">
    {#each blogs as blog}
        <div on:click={navigate('/blogs/' + blog.id)} class="bg-white p-4 mb-4 shadow-md pointer-cursor">
            <h2 class="text-xl font-bold">{blog.name}</h2>
        </div>
    {/each}
</div>

<style>
    .pointer-cursor:hover {
        cursor: pointer;
    }
</style>