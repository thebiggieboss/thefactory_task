import {Provider} from "@/service/base";

const getListPhotosUrl = "/photos";
const searchPhotosUrl = "/search/photos";
const getPhotosByIdUrl = (id) => `/photos/${id}`

function getListPhotos(per_page = undefined, page = undefined) {
    return Provider.get(getListPhotosUrl, {
        params: {
            per_page,
        }
    })
}
function searchPhotos(params, token) {
    return Provider.get(searchPhotosUrl, {
        cancelToken: token,
        params: params
    })
}
function getPhotosById(id) {
    return Provider.get(getPhotosByIdUrl(id))
}
export {
    getListPhotos,
    searchPhotos,
    getPhotosById
}