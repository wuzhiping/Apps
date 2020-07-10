import { axiosInstance } from 'boot/axios'

export function dev(url,data) {
    const p = new Promise(function (resolve, reject) {
        return axiosInstance
            .post("https://a.feg.com.tw/BDD/API/bpm/comm/form/dev/", data)
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

export function tree(url, data) {
    const p = new Promise(function (resolve, reject) {
        return axiosInstance
            .post("https://a.feg.com.tw/BDD/API/bpm/comm/form/tree/")
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