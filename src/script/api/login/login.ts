// 导入axios实例
import service from "../../utils/request"

export const login =(data:object)=>{
    return service({
        url:'/admin/login',
        method: 'post',
        data
    })
        
}


// // 导入axios实例
// export function login() {
//     return service({
//         url: '/mock-login',
//         method: 'post',
//     })
// }
// export default {
//     login
// }

