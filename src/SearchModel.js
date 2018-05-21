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

module.exports = Search;