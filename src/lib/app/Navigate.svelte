<script>
    import { navigate } from "../../stores/RoutesStore";
    export let name = '';
    export let params = {};
</script>

<button on:click={() => navigate(name, params)}>
    <slot></slot>
</button>