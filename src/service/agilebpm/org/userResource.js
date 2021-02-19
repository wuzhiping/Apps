import { axiosInstance } from 'boot/axios'
import { Cookies } from 'quasar'

export function userMsg() {
    const p = new Promise(function (resolve, reject) {
        return axiosInstance
            .post("/org/userResource/userMsg",null,{timeout:1600} )
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
    return p
}
