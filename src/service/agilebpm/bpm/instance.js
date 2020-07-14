import { axiosInstance } from 'boot/axios'

export function getOpinion(instId, taskId) {
    const p = new Promise(function (resolve, reject) {
        return axiosInstance
            .post("/bpm/instance/getOpinion?instId=" + (instId || "") + "&taskId=" + (taskId || ""))
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

export function getById(instId) {
    const p = new Promise(function (resolve, reject) {
        return axiosInstance
            .post("/bpm/instance/getById?instId=" + instId)
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

export function flowImage(instId, defId, taskId) {
    const p = new Promise(function (resolve, reject) {
        return axiosInstance
            .get("/bpm/instance/flowImage?instId=" + (instId || "") + "&defId=" + (defId || "") + "&taskId=" + (taskId || ""), { responseType: 'arraybuffer' })
            .then(response => {
                let image = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                    )
                );
                let data = `data:${response.headers[
                    "content-type"
                ].toLowerCase()};base64,${image}`;
                //console.dir(response)
                //state.dispatch('userInfoBpm', data)
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
    return p
}

export function getFlowImageInfo(instanceId, defId, taskId) {
    const p = new Promise(function (resolve, reject) {
        return axiosInstance
            .post("/bpm/instance/getFlowImageInfo?instanceId=" + instanceId + "&defId=" + defId + "&taskId=" + taskId)
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

export function doAction(data) {
    const p = new Promise(function (resolve, reject) {
        return axiosInstance
            .post("/bpm/instance/doAction", data)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
    return p
}

export function getInstanceData(instanceId, readonly, defId, flowKey, formType) {
    const p = new Promise(function (resolve, reject) {
        let formData = new FormData();
        formData.append("instanceId", instanceId || "");
        formData.append("readonly", readonly || "false");
        formData.append("defId", defId || "");
        formData.append("flowKey", flowKey || "");
        formData.append("formType", formType || "pc");
        return axiosInstance
            .post("/bpm/instance/getInstanceData", formData)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
    return p
}