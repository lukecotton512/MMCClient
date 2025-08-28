// scdcookie.js
// Luke Cotton
// Manages browser cookies.

// SCDCookie class.
export default class SCDCookie {
    // Cookie array.
    cookies: SCDCookieItem[];

    // Static singleton instance.
    static readonly default: SCDCookie = new SCDCookie();

    // Create a cookie.
    public setCookie(key: string, value: string, date?: Date, path?: string) {
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
    }
    
    // Get all cookies.
    public getCookie(key: string): SCDCookieItem {
        this.loadAllCookies();
        return this.cookies[key];
    }
    
    // Fetches all cookies.
    public loadAllCookies() {
        this.cookies = [];
        var fullCookieStr = document.cookie;
        
        var cookieArray = fullCookieStr.split(";");
        
        for (var i in cookieArray) {
            var item = cookieArray[i];
            
            item = item.trim();
            if (item != "") {
                var splitItem = item.split("=");
                let key = splitItem[0].trim();
                let value = splitItem[1] != null ? splitItem[1].trim() : "";
                this.cookies[key] = new SCDCookieItem(key, value);
            }
        }
    }
    
    // Delete a cookie.
    public deleteCookie(key: string, path: string) {
        document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; "
        + path != null ? "path=" + path + ";" : "";
        this.loadAllCookies();
    }
}

// Class that defines a cookie.
export class SCDCookieItem {
    constructor(public key: string, public value?: string) {}
}