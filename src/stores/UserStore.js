import { readable, writable } from "svelte/store"
import { navigate } from "./RoutesStore"

const user = readable({});
export const isLogged = writable(false);


export const login = async ({username, password}) => {
    const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });
    const data = await res.json();
    if (data.error) {
        return;
    } else {
        if (data.access_token) {
            localStorage.setItem("token", data.access_token);
            isLogged.set(true);
            navigate("home");
        }
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    isLogged.set(false);
    navigate("home");
};