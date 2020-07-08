import { axiosInstance } from 'boot/axios'

export function doAction(data) {
    const p = new Promise(function (resolve, reject) {
        return axiosInstance
            .post("/bpm/task/doAction", data)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
    return p
}

export function getBpmTask(id) {
    const p = new Promise(function (resolve, reject) {
        return axiosInstance
            .post("/bpm/task/getBpmTask?id=" + id)
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

export function getVariables(taskId, isLocal) {
    const p = new Promise(function (resolve, reject) {
        return axiosInstance
            .post("/bpm/task/getVariables?taskId=" + taskId + "&isLocal=" + isLocal)
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

export function getTaskData(taskId, formType) {
    const p = new Promise(function (resolve, reject) {
        return axiosInstance
            .post("/bpm/task/getTaskData?taskId=" + taskId + "&formType=" + formType)
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

// export function doAction() {
//     const p = new Promise(function (resolve, reject) {
//         return axiosInstance
//             .post("/bpm/task/doAction?taskId=" + taskId + "&formType=" + formType)
//             .then(response => {
//                 //console.dir(response)
//                 //state.dispatch('userInfoBpm', data)
//                 resolve(response)
//             })
//             .catch(error => {
//                 reject(error)
//             })
//     })
//     return p
// }