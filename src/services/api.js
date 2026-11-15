import axios from "axios"

export const api = axios.create({
    // A API original (hamburgueria-kenzie-json-serve.herokuapp.com) foi desativada.
    // Os produtos agora vêm de public/products.json, servido pelo próprio Vite.
    baseURL: "/",
    timeout: 8000,
})
