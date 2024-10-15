/**
 * Fetch requests to server to deal with
 *  - Persisted data (MongoDB)
 *  - Content generation (OpenAI)
 */

var debug = require('debug')('app:server-requests');

// -----------------
// Database requests
// -----------------

// --- CREATE ---

/**
 * 
 * @param {string/number} userID 
 * @param {string} username 
 * @param {string} avatar 
 * @returns string, confirmation
 */
export async function loginUserDB(userID:string, username:string="new_user", avatar:string="") {
    const request = new Request("/api/user", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID, username, avatar})
    });
    
    var response = await fetch(request);
    if (response.status === 200) {
        return response.text();
    } else {
        throw new Error(await response.text(), { cause: response.status });
    }
}

// --- READ ---

/**
 * 
 * @param {number, string} userID 
 * @returns json, user information
 */
export async function getUserDB(userID:string) {
    var response = await fetch(`/api/user/${userID}`);
    if (response.status === 200) {
        return await response.json();
    } else {
        throw new Error(await response.text(), { cause: response.status });
    }
}

/**
 * 
 * @param {*} userID 
 * @returns json, user stats
 */
export async function getUserStatsDB(userID:string) {
    var response = await fetch(`/api/user/${userID}/userStats`);
    if (response.status === 200) {
        return await response.json();
    } else {
        throw new Error(await response.text(), { cause: response.status });
    }
}

// --- UPDATE ---

/**
 * 
 * @param {*} userID 
 * @param {string} username 
 * @returns string, confirmation
 */
export async function updateUsernameDB(userID:string, username:string) {
    const request = new Request(`/api/user/${userID}/username`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username})
    });
    
    var response = await fetch(request);
    if (response.status === 200) {
        return response.text();
    } else {
        throw new Error(await response.text(), { cause: response.status });
    }
}

/**
 * 
 * @param {*} userID 
 * @param {string} avatar 
 * @returns string, confirmation
 */
export async function updateAvatarDB(userID:string, avatar:string) {
    const request = new Request(`/api/user/${userID}/avatar`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({avatar})
    });
    
    var response = await fetch(request);
    if (response.status === 200) {
        return response.text();
    } else {
        throw new Error(await response.text(), { cause: response.status });
    }
}

/**
 * 
 * @param {*} userID 
 * @param {string} currentTheme 
 * @returns string, confirmation
 */
export async function updatePreviousThemesDB(userID:string, currentTheme:string) {
    const request = new Request(`/api/user/${userID}/previousThemes`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({currentTheme})
    });
    
    var response = await fetch(request);
    if (response.status === 200) {
        return response.text();
    } else {
        throw new Error(await response.text(), { cause: response.status });
    }
}

/**
 * 
 * @param {*} userID 
 * @param {*} scores 
 * @param {string} drawing 
 * @returns string, confirmation
 */
export async function addSessionResults(userID:string, scores:{innocent:{wins:number, losses:number}, inkposter:{wins:number, losses:number}}, drawing:string) {
    debug("Persist session results: ", scores, drawing);

    const request = new Request(`/api/user/${userID}/sessionResults`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({scores, drawing})
    });
    
    var response = await fetch(request);
    if (response.status === 200) {
        return response.text();
    } else {
        throw new Error(await response.text(), { cause: response.status });
    }
}

// --- DELETE ---

/**
 * 
 * @param {*} userID 
 * @returns string, confirmation
 */
export async function deleteUserDB(userID:string) {
    const request = new Request(`/api/user/${userID}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'}
    });
    
    var response = await fetch(request);
    if (response.status === 200) {
        return response.text();
    } else {
        throw new Error(await response.text(), { cause: response.status });
    }
}

// ---------------
// OpenAI requests
// ---------------

/**
 * 
 * @returns string, generated username
 */
export async function getGeneratedUsername() {
    var response = await fetch("/api/openai/username");
    if (response.status === 200) {
        return response.text();
    } else {
        throw new Error(await response.text(), { cause: response.status });
    }
}

/**
 * 
 * @returns json, generated session paramn
 */
export async function getGeneratedSessionParams(previousThemes:string[]) {
    const request = new Request(`/api/openai/sessionParams`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({previousThemes})
    });

    var response = await fetch(request);
    if (response.status === 200) {
        return response.json();
    } else {
        throw new Error(await response.text(), { cause: response.status });
    }
}