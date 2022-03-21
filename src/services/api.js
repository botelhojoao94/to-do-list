import axios from "axios";

export const api = axios.create({
    baseURL: "https://kanbanboard-back.vercel.app",
});
