import axios from "axios";

const BACKEND_URL = axios.create({
  baseURL: "https://notes-keeper-peach.vercel.app/api/v1/notes/",
});

export default BACKEND_URL;
