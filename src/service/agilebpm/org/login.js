import { axiosInstance } from 'boot/axios'
import { Cookies } from 'quasar'

export function valid(account,password) {
    const p = new Promise(function (resolve, reject) {
        let formData = new FormData();
        formData.append("account", account);
        formData.append("password", password);
        return axiosInstance
            .post("/org/login/valid", formData)
            .then(response => {
                //console.dir(response)
                //state.dispatch('userInfoBpm', data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
    return p
}

