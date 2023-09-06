import Axios from "axios";
//https://www.npmjs.com/package/axios#features

/*Creating an instance
You can create a new instance of axios with a custom config.*/

export const api = Axios.create({
  baseURL: "http://localhost:3002"
});
