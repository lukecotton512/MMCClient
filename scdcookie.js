// scdcookie.js
// Luke Cotton
// Manages browser cookies.



// Global object.
var scdcookie = {
    // Dictionary of cookies.
    cookies: {},
    // Create a cookie.
    setCookie: function(key, value, date, path) {
        // Update cookies.
        var cookieString = key + "=" + value + ";";
        if (date != null) {
            cookieString += "expires=" + date.toUTCString() + ";";
        }

        if (path != null) {
            cookieString += "path=" + path + ";";
        }

        document.cookie = cookieString;

        // Reload all cookies.
        this.loadAllCookies();
    },

    // Get all cookies.
    getCookie: function(key) {
        this.loadAllCookies();
        return this.cookies[key];
    },

    // Fetches all cookies.
    loadAllCookies: function() {
        this.cookies = {};
        var fullCookieStr = document.cookie;

        var cookieArray = fullCookieStr.split(";");
    
        for (var i in cookieArray) {
            var item = cookieArray[i];

            item = item.trim();
            if (item != "") {
                var splitItem = item.split("=");
                this.cookies[splitItem[0].trim()] = 
                    splitItem[1] != null ? splitItem[1].trim() : null;
            }
        }
    },

    // Delete a cookie.
    deleteCookie: function(key, path) {
        document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; "
            + path != null ? "path=" + path + ";" : "";
        this.loadAllCookies();
    }
};