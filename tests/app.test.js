const request = require("supertest");
const app = require("../src/app");

describe("InternTrack API", () => {
    test("GET /api/health returns healthy status", async () => {
        const response = await request(app).get("/api/health");
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.status).toBe("healthy");
    });

    test("POST /api/tasks rejects invalid task data", async () => {
        const response = await request(app).post("/api/tasks").send({ title: "" });
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
    });
});
