require("dotenv").config();
var db = require("../db.js");

describe("Connection and db test", () => { 
    beforeAll(async () => {
        await db.connectToMongoDB();
    });

    test("Create and delete user", async () => {
        await db.createUser("100", "rat1", "rat1.png");
        var user = await db.getUser("100");
        expect(user).toEqual({ _id: "100", username: 'rat1', avatar: 'rat1.png' });
        await db.deleteUserProfile("100");
        user = await db.getUser("100");
        expect(user).toBe(null);
    })

    test("Retrieve user", async () => {
        const user = await db.getUser("0");
        expect(user).toEqual({ _id: "0", username: 'rat', avatar: 'rat.png' });
    });

    test("Retrieve user stats", async () => {
        const stats = await db.getUserStats("0");
        expect(stats).toEqual({ _id: "0", innocent: {wins : 0, losses: 0}, inkposter: {wins : 0, losses: 0}, gallery: [] });
    });

    test("Update username", async () => {
        const response = await db.updateUsername("0", "rat1");
        expect(response.acknowledged).toBe(true);
        const user = await db.getUser("0");
        expect(user).toEqual({ _id: "0", username: 'rat1', avatar: 'rat.png' });
        await db.updateUsername("0", "rat");
    });

    afterAll(async () => {
        // Close connection
        await db.disconnectFromMongoDB();
        return;
    });
});