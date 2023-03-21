import { MockMethod } from "vite-plugin-mock";
import login from "./login.json"
//login是变量，可以随便命名

export default [
  {
    url: "/mock-login", // 注意，这里只能是string格式
    method: "post",
    response: () => {
      return {
        code: 0,
        message: 'ok',
        menusList:login,
      }
    },
  },
] as MockMethod[]