
const request = require("supertest");
const app = require("../src/app");

describe("InternTrack API", () => {
    test("GET /api/health returns healthy status", async () => {
        const response = await request(app).get("/api/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.status).toBe("healthy");
    });

    test("POST /api/tasks rejects an empty title", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({ title: "" });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
    });

    test("POST /api/tasks rejects a title longer than 150 characters", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({ title: "A".repeat(151) });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
    });

    test("POST /api/tasks rejects an invalid status", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "Test task",
                status: "INVALID_STATUS"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
    });

    test("POST /api/tasks rejects an invalid due date", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "Test task",
                due_date: "not-a-date"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
    });
 });