import { axiosInstance } from 'boot/axios'

export function getNodes(treeKey) {
    const p = new Promise(function (resolve, reject) {
        let formData = new FormData();
        formData.append("treeKey", treeKey);
        return axiosInstance
            .post("sys/sysTreeNode/getNodes", formData)
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