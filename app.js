const search_bar = document.getElementById("search_bar");
const search_button = document.getElementById("search_button");
const site_bar = document.getElementById("site_bar");

function createPlaceholder(query, site) {
    var url = `https://duckduckgo.com/?q=${encodeURI(query)}`;
    if(site) {
        url += `+site:${site}`;
    }
    return url
}

search_button.addEventListener('click', function(e) {
    e.preventDefault();
    var link = createPlaceholder(search_bar.value, site_bar.value)
    console.log(link);

});