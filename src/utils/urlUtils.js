// search parameter manipulation 
export function getQueryParamByName(name) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === name) {
            return pair[1];
        }
    }
    return null;
}

export function setQueryParam(queryParamObject) {
    if (window.history.pushState) { //neu khong co search param
        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?`;
        let keyArr = Object.keys(queryParamObject);
        for (let i = 0; i < keyArr.length; i++) {
            //neu la category.id hoac category => value bang 0 thi khong them vao
            newurl = newurl + keyArr[i] + '=' + queryParamObject[keyArr[i]];
            if (i !== keyArr.length - 1)
                newurl = newurl + "&";
        };

        window.history.pushState({ path: newurl }, '', newurl);
    }
}

export function clearQueryParam() {
    //
}

export function isQueryParamHasValue(queryParam, values) {
    let value = getQueryParamByName(queryParam);

    for (let i = 0; i <= values.length; i++) {
        if (value === values[i])
            return true;
    }
    return false;
}

export function generateSearchParam(searchParamObject) { //for generating search term from search term object.
    let searchParam = '';
    console.log(searchParamObject)
    Object.keys(searchParamObject)
        .forEach(function eachKey(key) {

            if (
                (((key === "category.id" || key === "category") && searchParamObject[key] !== 0)
                    || (key !== "category.id" && key !== "category"))
                && searchParamObject[key] !== null
            ) {
                //neu la category.id hoac category => value bang 0 thi khong them vao
                //neu la page hoac paginator thi -1
                if (key === "page" || key === "paginator") {
                    searchParam = searchParam + key + '=' + (Number.parseInt(searchParamObject[key]) - 1) + "&";
                } else
                    searchParam = searchParam + key + '=' + searchParamObject[key] + "&";
            }

        });
    console.log(searchParam);
    return searchParam;
}

