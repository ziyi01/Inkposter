require("dotenv").config();
const db = require("../db.js");

describe("Connection and db test", () => { 
    beforeAll(async () => {
        await db.connectToMongoDB();
    }, 10000);

    test("Create and delete user", async () => {
        await db.createUser("999", "rat1", "rat1.png");
        let user = await db.getUser("999");
        expect(user.avatar).toEqual('rat1.png');
        let res = await db.deleteUserProfile("999");
        expect(res).toBe(true);
    })

    test("Retrieve user stats", async () => {
        const stats = await db.getUserStats("0");
        expect(stats._id).toEqual("0");
    });

    test("Update username", async () => {
        const response = await db.updateUsername("0", "rat1");
        expect(response.acknowledged).toBe(true);
        const user = await db.getUser("0");
        expect(user.username).toEqual("rat1");
        await db.updateUsername("0", "rat");
    });

    afterAll((done) => {
        // Close connection
        db.disconnectFromMongoDB();
        done();
    }, 10000);
});