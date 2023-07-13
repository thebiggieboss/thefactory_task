import {Provider} from "@/service/base";

const getListPhotosUrl = "/photos";
const searchPhotosUrl = "/search/photos";

function getListPhotos(per_page = undefined) {
    return Provider.get(getListPhotosUrl, {
        params: {
            per_page
        }
    })
}
function searchPhotos(query, per_page = undefined) {
    return Provider.get(searchPhotosUrl, {
        params: {
            query: query,
            per_page: per_page
        }
    })
}
export {
    getListPhotos,
    searchPhotos
}