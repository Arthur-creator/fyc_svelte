<script>
    import Dialog from "../lib/Dialog.svelte";
    import FormAdd from "../lib/FormAdd.svelte";
    import RowItem from "../lib/RowItem.svelte";

    let currentBlog = {};
    let messages = "";

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
                fetch('http://localhost:3001/messages/channel/'+currentBlog.id, {
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
                            messages = data;
                            console.log(messages)
                        }
                    })
            }
        })

    let dialog;
    let dialog2;

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

    const user = {};

    const addMessage = () => {
        fetch('http://localhost:3001/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: formFields.value,
                channel_id: currentBlog.id,
                user_id: localStorage.getItem('id')
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                    return;
                }else {
                    messages[messages.length] = data;
                    dialog.close();
                }
            })
    }

    const deleteMessage = (id) => {
        fetch('http://localhost:3001/messages/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }else {
                alert('Message supprimé !');
                messages = messages.filter(message => message.id !== id);
            }
        })
    }

    const editMessage = (id) => {

    }
</script>

<div class="message-list">
    <h1 class="text-4xl mb-5">Liste des messages du blog
        <span class="font-bold">{currentBlog.name}</span>
    </h1>
    <div on:click={() => dialog.showModal()} class="pointer-cursor">
        <button class="bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mb-5">
        Ajouter un message
        </button>
    </div>
    <Dialog bind:dialog2 on:close>
        <FormAdd closeDialog={closeDialog} fields={formFields} title={"Ajouter un message"} handleSubmit={addMessage}/>
    </Dialog>
    {#each messages as message}
        <RowItem dataShow={message.message} handleEdit={() => dialog2.showModal()} handleDelete={() => deleteMessage(message.id)} />
    {/each}
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