import { axiosInstance } from 'boot/axios'

export function receiveList(order, offset, limit, node_name, filter) {
    const p = new Promise(function (resolve, reject) {
        let formData = new FormData();
        formData.append("order", order);
        formData.append("offset", offset);
        formData.append("limit", limit);
        formData.append("node_name", node_name);
        if (filter) {
            for (var e in filter) {
                formData.append(e, filter[e]);
            }
        }
        return axiosInstance
            .post("/bpm/carbonCopy/receiveList", formData)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
    return p
}