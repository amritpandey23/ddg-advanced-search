
/**
 * Created by Amrit Pandey, Twitter: @amritpandeyy
 * Licensed under MIT
 * Search Providers Used:
 *      DuckDuckGo [https://duck.co/help/results/syntax]
 */

/**
 * Store all the elements in an object, containg their name
 * as property and DOM objects as their values.
 * It is easy to keep track of all the elements in one object,
 * hence I've created a method that produces an object containing
 * them. To add new DOM object, just add its ID to elementsID array.
 */

if (!localStorage.getItem('historyData')) {
    var historyData = [];
} else {
    var historyData = JSON.parse(localStorage.getItem('historyData'));
}

var elementID = [
    "search_bar",
    "search_button",
    "site_bar",
    "inurl_bar",
    "intitle_bar",
    "filetype",
    "strict",
    "safe",
    "exclude_site_bar",
    "toggle_exclude_site",
    "exclude_term_bar",
    "toggle_exclude_term",
    "recent_search_list"
];
var elements = collectElements(elementID);

populateHistory(historyData);

// Exclude data are optional hence they needs to be enabled by users to use them.
// These two lines, add listeners to their respective checkboxes.
toggleTextInput(elements["toggle_exclude_site"], elements["exclude_site_bar"]);
toggleTextInput(elements["toggle_exclude_term"], elements["exclude_term_bar"]);


/**
 * Event Listener on `search` button.
 * This event will collect the data entered by the users
 * in the form and input fields and make an object and then
 * pass that object to the a function that will create a
 * template URL for duckduckgo.
 */
elements["search_button"].addEventListener('click', function(e) {

    // Preventing search button to work if no query entered by user.
    // WARNING: href value of search button may contain template URL of old searches.
    if(!elements["search_bar"].value) {
        e.preventDefault();
        return;
    } else {

        // Collect data/preferences from inputs and store in object named parameters.
        /**
         * parameters are:
         * - query: query to search for
         * - site: specific site to search for
         * - inurl: terms appearing in the result's url
         * - intitle: terms appearing in the result's title
         * - filetype: of the search results, eg: pdf, docs etc.
         */
        var parameters = {
            "query": elements["search_bar"].value,
            "site": elements["site_bar"].value,
            "inurl": elements["inurl_bar"].value,
            "intitle": elements["intitle_bar"].value,
            "filetype": elements["filetype"].value,
            "strict": elements["strict"].checked,
            "safe": elements["safe"].checked
        }
        
        // Creating new search object based on `Search` model.
        var searchItem = new Search(parameters);

        console.log(searchItem);

        // Update search history data.
        historyData.unshift(searchItem);
        localStorage.setItem('historyData', JSON.stringify(historyData));

        // Clear query field for next search.
        elements["recent_search_list"].textContent = '';

        // Add entry to the search list.
        populateHistory(historyData);

        // Finally set href value of search button to the URL generated
        // from the search object.
        e.target.href = searchItem.createURL();
    }
});

/**
 * REFACTORING
 */

// [Function] -- Returns DOM object with respectively passed ID.
function getElement(id) {
    return document.getElementById(id);
};

// [Function] -- Returns collect of DOM objects having IDs in `elementID` array. 
function collectElements(ID_collection) {
    var elements = {}
    elementID.forEach(function(ele) {
        elements[ele] = getElement(ele);
    });
    return elements;
};

// [Function] -- Toggle exclude text fields on changing their respective checkboxes.
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

// [Function] -- Generate an HTML li element containing previous search info and appends
// to the search history UL list.
function populateHistory(historyData = []) {
    historyData.forEach(function(search) {
        var li = document.createElement("li");
        var a = document.createElement('a');
        a.href = search.url;
        a.textContent = search.query;
        a.target = "_blank";
        li.appendChild(a);
        elements["recent_search_list"].appendChild(li); 
    });
}

/**
 * Creating a search model to effectively store data entered by
 * users. Also helper methods to do tasks like generating url,
 * population of history etc.
 * 
 * Accepts: para[Obj.] with properties query, site, inurl,
 * intitle, filetype[null], strictSearch[false], safeOn[false]. 
 */
class Search {

    constructor(para) {
        this.query = para["query"];
        this.site = para["site"] || '';
        this.inurl = para["inurl"] || '';
        this.intitle = para["intitle"] || '';
        this.filetype = para["filetype"] || 'Null';
        this.strictSearch = para["strict"] || false;
        this.safeOn = para["safe"] || false;
        this.url = this.createURL()
    }

    /**
     * Create an object containing the preference passed by
     * the user, this will be used to populate search entry
     * in search entry list.
     */
    produceSearchInfo() {
        return {
            "query": this.query,
            "site": this.site,
            "inurl": this.inurl,
            "intitle": this.intitle,
            "filetype": this.filetype,
            "strictSearch": this.strictSearch,
            "safeOn": this.safeOn
        };
    }

    /**
     * CREATE TEMPLATE URL
     * Description: This function returns a template url for search.
     * It takes an object argument that containes property like query,
     * site, inurl, intitle, filetype and so on.
     * 
     * I've used if conditional to check if users have indeed provided
     * those values. Please assist if there is any cleaner way to do it.
     */
    createURL() {
        var para = this.produceSearchInfo();

        // Check if `strict` search is checked
        if(para["strictSearch"]) {
            para["query"] = '"' + para["query"] + '"';
        }

        // Enforce safe search searching if safe is on
        if(para["safeOn"]) {
            para["query"] = '!safeon ' + para["query"];
        }

        // URL template only with search query
        var url = `https://duckduckgo.com/?q=${encodeURIComponent(para["query"])}`;

        // Adding site preference if passed by user
        if(para["site"]) {
            url += `+site:${para["site"]}`;
        }

        // Adding inurl preference if passed by user
        if(para["inurl"]) {
            url += `+inurl:${para["inurl"]}`;
        }

        // Adding intitle preference if passed by user
        if(para["intitle"]) {
            url += `+inurl:${para["intitle"]}`;
        }

        // Adding filetype preference if passed by user
        if (para["filetype"] != 'Null') {
            url += `+filetype:${para["filetype"]}`;
        }

        return url;
    }
}