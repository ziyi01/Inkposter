require("dotenv").config();
var db = require("../db.js");

describe("Connection and db test", () => { 
    beforeAll(async () => {
        await db.connectToMongoDB();
    }, 10000);

    test("Create and delete user", async () => {
        await db.createUser("100000", "rat1", "rat1.png");
        var user = await db.getUser("100000");
        expect(user.avatar).toEqual('rat1.png');
        var res = await db.deleteUserProfile("100000");
        expect(res).toBe(true);
    })

    test("Retrieve user stats", async () => {
        const stats = await db.getUserStats("0");
        expect(stats).toEqual({
            _id: "0",
            innocent: {wins : 4, losses: 0},
            inkposter: {wins : 4, losses: 7},
            gallery: ["new_drawing", "new_drawing", "new_drawing", "new_drawing", "new_drawing"] });
    });

    test("Update username", async () => {
        const response = await db.updateUsername("0", "rat1");
        expect(response.acknowledged).toBe(true);
        const user = await db.getUser("0");
        expect(user).toEqual({
            _id: "0",
            username: 'rat1',
            avatar: 'better_rat.png',
            "previousThemes": ["rat", "rat", "rat", "rat", "rat"]});
        await db.updateUsername("0", "rat");
    });

    afterAll((done) => {
        // Close connection
        db.disconnectFromMongoDB();
        done();
    }, 10000);
});