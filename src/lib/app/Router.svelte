<script>
    import { route, navigate } from "../../stores/RoutesStore";
    import { isLogged } from "../../stores/UserStore";
    let currentRoute;
    let userAuthenticated;
    isLogged.subscribe((value) => {
        userAuthenticated = value;
    });
    route.subscribe((value) => {
        console.log(value);
        currentRoute = value;
    });

    $: {
        if(!userAuthenticated && currentRoute?.needAuth) {
            navigate('login');
        }
    }
</script>

{JSON.stringify(currentRoute)}
<svelte:component this={currentRoute?.component} params={currentRoute?.params} />
