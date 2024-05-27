import axios from "axios";

const fecther = (url: string) => axios.get(url).then((res) => res.data);

export default fecther;
