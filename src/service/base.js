import axios from "axios";
const BaseUrl = "https://api.unsplash.com";

const Provider = axios.create({
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    params: {
        client_id: "sUxZsoOe9Ve0JQ6I1brg97IT4ewOdxGQdA72uymNG1s"
    },
    baseURL: `${BaseUrl}/`,
    timeout: 100000,
});


export { Provider, BaseUrl };
