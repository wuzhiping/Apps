import { axiosInstance } from 'boot/axios'

export function todoTaskList(offset, limit, sort, order, filter) {
    const p = new Promise(function (resolve, reject) {
        let formData = new FormData();
        formData.append("offset", offset);
        formData.append("limit", limit);
        formData.append("sort", sort);
        formData.append("order", order);
        formData.append("filter$VEQ", filter);
        return axiosInstance
            .post("/bpm/my/todoTaskList", formData)
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

export function applyTaskList(offset, limit, sort, order, filter) {
    const p = new Promise(function (resolve, reject) {
        let formData = new FormData();
        formData.append("offset", offset);
        formData.append("limit", limit);
        formData.append("sort", sort);
        formData.append("order", order);
        formData.append("filter$VEQ", filter);
        return axiosInstance
            .post("/bpm/my/applyTaskList", formData)
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

export function definitionList(offset, limit, sort, order, filter) {
    const p = new Promise(function (resolve, reject) {
        let formData = new FormData();
        formData.append("offset", offset);
        formData.append("limit", limit);
        formData.append("sort", sort);
        formData.append("order", order);
        formData.append("filter$VEQ", filter);
        return axiosInstance
            .post("/bpm/my/definitionList", formData)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
    return p
}