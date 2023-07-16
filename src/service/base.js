import axios from "axios";
const BaseUrl = import.meta.env.VITE_API_URL;
const CancelerToken = () => axios.CancelToken.source();

const Provider = axios.create({
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    params: {
        client_id: import.meta.env.VITE_API_PHOTO_KEY
    },
    baseURL: `${BaseUrl}/`,
    timeout: 100000,
});


export { Provider, BaseUrl, CancelerToken };
