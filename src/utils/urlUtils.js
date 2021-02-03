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

export function     setSearchParam(name, value) {
    if (window.location.search) {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        let newQuery = "";
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] === name) {
                if (i === vars.length - 1) {
                    newQuery = newQuery + pair[0] + "=" + value;
                }
                else {
                    newQuery = newQuery + pair[0] + "=" + value + "&";
                }
            } else
                if (i === vars.length - 1)
                    newQuery = newQuery + vars[i];
                else
                    newQuery = newQuery + vars[i] + "&";
        }

        if (window.history.pushState) {
            let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${newQuery}`;
// console.log(newurl)

            window.history.pushState({ path: newurl }, '', newurl);
        }
        return;
    }

    if (window.history.pushState) {
        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${name}=${value}`;
        window.history.pushState({ path: newurl }, '', newurl);
    }
}

export function isSearchParamHasValue(searchParam, values) {
    let value = getSearchParamByName(searchParam);

    for (let i = 0; i <= values.length; i++) {
        if (value === values[i])
            return true;
    }
    return false;
}

