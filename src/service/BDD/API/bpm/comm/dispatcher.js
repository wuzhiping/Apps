import { axiosInstance } from 'boot/axios'

export function dispatcher(from,data) {
    const p = new Promise(function (resolve, reject) {
        return axiosInstance
            .post("/BDD/API/bpm/comm/dispatcher", { "from":from,"data":data})
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