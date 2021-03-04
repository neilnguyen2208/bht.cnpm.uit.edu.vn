// search parameter manipulation 
export function getSearchParamByName(name) {
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

export function setSearchParam(searchParamObject) {

    // if (window.location.search) { //neu dang co search param
    //     let query = window.location.search.substring(1);
    //     let splitedArr = query.split("&");
    //     let newQuery = "";
    //     let keyArr = Object.keys(searchParamObject);

    //     //update
    //     for (let i = 0; i < splitedArr.length; i++)
    //         for (let j = 0; j < keyArr.length; j++) {
    //             let pair = splitedArr[i].split("=");
    //             if (pair[0] === keyArr[j]) {
    //                 if (i === splitedArr.length - 1) {
    //                     newQuery = newQuery + pair[0] + "=" + searchParamObject[keyArr[j]];
    //                 }
    //                 else {
    //                     newQuery = newQuery + pair[0] + "=" + searchParamObject[keyArr[j]] + "&";
    //                 }
    //             } else
    //                 if (i === splitedArr.length - 1)
    //                     newQuery = newQuery + splitedArr[i];
    //                 else
    //                     newQuery = newQuery + splitedArr[i] + "&";

    //         }

    //     //append param
        
    //     //prevent error on category

    //     //set param
    //     if (window.history.pushState) {
    //         let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${newQuery}`;
    //         window.history.pushState({ path: newurl }, '', newurl);
    //     }

    //     return;
    // }

    if (window.history.pushState) { //neu khong co search param
        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?`;
        let keyArr = Object.keys(searchParamObject);
        for (let i = 0; i < keyArr.length; i++) {
            //neu la category.id hoac category => value bang 0 thi khong them vao
            newurl = newurl + keyArr[i] + '=' + searchParamObject[keyArr[i]];
            if (i !== keyArr.length - 1)
                newurl = newurl + "&";
        };

        window.history.pushState({ path: newurl }, '', newurl);
    }
}

export function clearSearchParam() {
    //
}

export function isSearchParamHasValue(searchParam, values) {
    let value = getSearchParamByName(searchParam);

    for (let i = 0; i <= values.length; i++) {
        if (value === values[i])
            return true;
    }
    return false;
}


export function generateSearchTerm(searchTermObject) { //for generating search term from search term object.
    let searchTerm = '';
    Object.keys(searchTermObject)
        .forEach(function eachKey(key) {
            // console.log(key);
            // console.log(searchTermObject[key])
            if (
                (((key === "category.id" || key === "category") && searchTermObject[key] !== 0)
                    || (key !== "category.id" && key !== "category"))
                && searchTermObject[key] !== null
            ) {
                //neu la category.id hoac category => value bang 0 thi khong them vao
                searchTerm = searchTerm + key + '=' + searchTermObject[key] + "&";
            }
        });
    console.log(searchTerm);
    return searchTerm;
}

