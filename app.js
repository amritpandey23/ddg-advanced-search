const search_bar = document.getElementById("search_bar");
const search_button = document.getElementById("search_button");
const site_bar = document.getElementById("site_bar");
const filetypes = document.getElementById("filetype");
const strict = document.getElementById("strict");

const exclude_site_bar = document.getElementById("exclude_site_bar");
const toggle_exclude_site = document.getElementById("toggle_exclude_site");

const exclude_term_bar = document.getElementById("exclude_term_bar");
const toggle_exclude_term = document.getElementById("toggle_exclude_term");

function createPlaceholder(query, site, filetype) {
    if(strict.checked) {
        query = '"' + query + '"';
    }
    var url = `https://duckduckgo.com/?q=${encodeURI(query)}`;
    if(site) {
        url += `+site:${site}`;
    }
    if (filetype != 'Null') {
        url += `+filetype:${filetype}`;
    }
    return url
}

search_button.addEventListener('click', function(e) {
    e.preventDefault();
    var link = createPlaceholder(search_bar.value, site_bar.value, filetypes.value)
    console.log(link);
});

function toggleTextInput(toggler, inputTarget) {
    toggler.addEventListener('change', function(e) {
        if(e.target.checked) {
            inputTarget.disabled = false;
        } else {
            inputTarget.value = '';
            inputTarget.disabled = true;
        }
    })
};

toggleTextInput(toggle_exclude_site, exclude_site_bar);
toggleTextInput(toggle_exclude_term, exclude_term_bar)
