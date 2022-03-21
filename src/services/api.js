import axios from "axios";

export const api = axios.create({
    baseURL: "https://v360-kanban-node.vercel.app/",
});
