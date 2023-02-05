<script>

import Dialog from "../lib/Dialog.svelte";
import {navigate} from "svelte-navigator";
import FormAdd from "../lib/FormAdd.svelte";
import RowItem from "../lib/RowItem.svelte";

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
            return;
        }else {
            blogs[blogs.length] = data;
            closeDialog();
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
    formFields.value = "";
}

const redirect = (id) => {
    navigate('/blogs/' + id);
}

const deleteChannel = (id) => {
    fetch('http://localhost:3001/channels/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            return;
        }else {
            alert('Channel supprimé !');
            blogs = blogs.filter(blog => blog.id !== id);
        }
    })
}

const editChannel = (blog) => {
    navigate('/blogs/edit/'+ blog.id)
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
        <RowItem dataShow={blog.name} handleClick={() => redirect(blog.id)} handleEdit={() => editChannel(blog)} handleDelete={() => deleteChannel(blog.id)} />
    {/each}
</div>

<style>
    .pointer-cursor:hover {
        cursor: pointer;
    }
</style>