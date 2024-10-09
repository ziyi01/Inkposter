/**
 * API calls to server to deal with
 *  - Persisted data (MongoDB)
 *  - Content generation (OpenAI)
 */

// ---------------
// Database requests
// ---------------

// --- CREATE ---
async function createUserDB(userID, username, avatar) {
    const request = new Request("/api/user", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({userID, username, avatar})
    });
    
    var response = await fetch(request);
    if (response.status === 200) {
        console.log(response.text());
    } else {
        throw new Error(response.status + response.text());
    }
}

// --- READ ---
async function getUserDB(userID) {
    var response = await fetch(`/api/user/${userID}`);
    if (response.status === 200) {
        console.log(response.json());
    } else {
        throw new Error(response.status + response.json);
    }
}

// --- UPDATE ---

// TODO

// --- DELETE ---

// TODO

// ---------------
// OpenAI requests
// ---------------

// TODO

exports.getUserDB = getUserDB;
exports.createUserDB = createUserDB;
