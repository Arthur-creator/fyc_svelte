<script>
    import Dialog from "../lib/Dialog.svelte";
    import FormAdd from "../lib/FormAdd.svelte";

    let currentBlog = {}
    let message = {}

    let id = window.location.pathname.split('/')[2];

    fetch('http://localhost:3001/channels/'+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(res => res.json())
        .then(channel => {
            if (channel.statusCode) {
                alert(channel.message);
                return;
            }else {
                currentBlog = channel;
                fetch('http://localhost:3001/messages', {
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
                            message=data;
                        }
                    })
            }
        })

    let dialog;

    const closeDialog = () => {
        dialog.close();
    }

    const formFields = [
        {
            name: 'message',
            label: 'Message : ',
            type: 'text',
            value: '',
        }
    ]

    const addMessage = () => {
        console.log('addMessage')
    }
</script>

<div class="message-list">
    <h1 class="text-4xl mb-5">Liste des messages du channel
        <span class="font-bold">{currentBlog.name}</span>
    </h1>
    <div on:click={() => dialog.showModal()} class="pointer-cursor">
        <button class="bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded">
        Ajouter un message
        </button>
    </div>
    <Dialog bind:dialog on:close>
        <FormAdd closeDialog={closeDialog} fields={formFields} title={"Ajouter un message"} handleSubmit={addMessage}/>
    </Dialog>
    <!--{#each messages as message}-->
<!--        <div class="message">-->
<!--            {message.text}-->
<!--        </div>-->
<!--    {/each}-->
</div>


<style>
    .message-list {
        max-width: 600px;
        margin: 0 auto;
    }

    .message {
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
        margin-bottom: 1rem;
        padding: 1rem;
    }
</style>