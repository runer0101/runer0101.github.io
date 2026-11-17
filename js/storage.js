// localStorage can throw when the browser blocks storage; every reader and
// writer goes through here so one blocked call cannot break the page.
export function readStored(key, fallback) {
    try {
        var value = localStorage.getItem(key);
        return value === null ? fallback : value;
    } catch (error) {
        return fallback;
    }
}

export function writeStored(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        // The page still works for this visit; the choice is just not remembered.
    }
}
