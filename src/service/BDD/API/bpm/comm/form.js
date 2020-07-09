import { axiosInstance } from 'boot/axios'

export function dev(data) {
    const p = new Promise(function (resolve, reject) {
        return axiosInstance
            .post("/BDD/API/bpm/comm/form/dev/", data)
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