/**
 * Fetch reqeusts to server to deal with
 *  - Persisted data (MongoDB)
 *  - Content generation (OpenAI)
 */

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
async function loginUserDB(userID, username="new_user", avatar="") {
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
async function getUserDB(userID) {
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
async function getUserStatsDB(userID) {
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
async function updateUsernameDB(userID, username) {
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
async function updateAvatarDB(userID, avatar) {
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
async function updatePreviousThemesDB(userID, currentTheme) {
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
 * @param {json} scores 
 * @param {string} drawing 
 * @returns string, confirmation
 */
async function addSessionResults(userID, scores, drawing) {
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
async function deleteUserDB(userID) {
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
async function getGeneratedUsername() {
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
async function getGeneratedSessionParams() {
    var response = await fetch("/api/openai/sessionParams");
    if (response.status === 200) {
        return response.json();
    } else {
        throw new Error(await response.text(), { cause: response.status });
    }
}


// Export db functions
exports.getUserDB = getUserDB;
exports.loginUserDB = loginUserDB;
exports.getUserStatsDB = getUserStatsDB;
exports.updateUsernameDB = updateUsernameDB;
exports.updateAvatarDB = updateAvatarDB;
exports.updatePreviousThemesDB = updatePreviousThemesDB;
exports.addSessionResults = addSessionResults;
exports.deleteUserDB = deleteUserDB;

// Export openai functions
exports.getGeneratedUsername = getGeneratedUsername;
exports.getGeneratedSessionParams = getGeneratedSessionParams;