import { axiosInstance } from 'boot/axios'

export function receiveList(order, offset, limit, subject, node_name, read) {
    const p = new Promise(function (resolve, reject) {
        let formData = new FormData();
        formData.append("order", order);
        formData.append("offset", offset);
        formData.append("limit", limit);
        formData.append("subject^VLK", subject);
        formData.append("node_name", node_name);
        formData.append("read_^VEQ", read);
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