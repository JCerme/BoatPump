import productsModel from '../DAO/mongo/models/products.model.js';

export default async function response(status, result, params){
    const documents = await productsModel.find().count();
    let pages = (params.limit && Math.ceil(documents / params.limit)) || Math.ceil(documents / 6);
    let page = Number(params.page) || 1;

    return {
        "status": status,
        "payload": result,
        "totalPages": pages,
        "page": page,
        "hasPrevPage": page > 1,
        "prevPage": page > 1 ? page - 1 : null,
        "prevLink": prevLink(page, params),
        "hasNextPage": page < pages,
        "nextPage": page < pages ? page + 1 : null,
        "nextLink": nextLink(page, pages, params),
    }
}

function prevLink(page, params){
    let prevPage = page > 1 ? page - 1 : null;
    return buildURL(params, prevPage);
}

function nextLink(page, pages, params){
    let nextPage = page < pages ? page + 1 : null;
    return buildURL(params, nextPage);
}

// Build the new URL
function buildURL(params, page){
    let url = `/?`;
    if(page || params.page) url += `&page=${page || params.page}`;
    if(params.limit) url += `&limit=${params.limit}`;
    if(params.sort) url += `&sort=${params.sort}`;
    if(params.query) url += `&query=${params.query}`;
    return url;
}