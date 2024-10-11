import server from './server-requests';

function runTests() {
    server.getUserDB(0).then(printRes).catch(handleError);
    /*
    server.createUserDB(10, "newest_user", "pic.png").then(printRes).catch(handleError);
    server.getUserStatsDB(0).then(printRes).catch(handleError);
    server.updateUsernameDB(0, "better_rat").then(printRes).catch(handleError);
    server.updateAvatarDB(0, "better_rat.png").then(printRes).catch(handleError);
    server.updatePreviousThemesDB(0, "rat").then(printRes).catch(handleError);
    var scores = { innocent: { wins: 4, losses: 0 }, inkposter: { wins: 4, losses: 7 } };
    server.addSessionResults(0, scores, "new_drawing").then(printRes).catch(handleError);
    server.deleteUserDB(12345).then(printRes).catch(handleError);
    server.getGeneratedUsername().then(printRes).catch(handleError);
    server.getGeneratedSessionParams().then(printRes).catch(handleError);
    */
}

function handleError(e : Error) {
console.log(e.cause, e.message);
}

function printRes(res : any) {
console.log(res);
}

export default runTests;