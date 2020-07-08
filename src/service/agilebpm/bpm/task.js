import { axiosInstance } from 'boot/axios'

export function doAction(data) {
    const p = new Promise(function (resolve, reject) {
        // {
        //     "taskId": "417722184227356673",
        //         "nodeId": "UserTask1",
        //             "instanceId": "417722184124596225",
        //                 "data": {
        //         "bizId": "BIZ",
        //             "variables": {
        //             "TITLE": "TITLE-SKI",
        //                 "VAR1": "SKI",
        //                     "Num": 0,
        //                         "CustomId": "CustomId",
        //                             "__BizKey__": "BIZ"
        //         }
        //     },
        //     "action": "agree",
        //         "extendConf": {
        //         "nodeId": ""
        //     },
        //     "opinion": "同意"
        // }


        return axiosInstance
            .post("/bpm/task/doAction", data)
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