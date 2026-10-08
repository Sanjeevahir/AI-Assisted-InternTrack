const http = require("http");

const HOST = "localhost";
const PORT = 5000;
const PATH = "/api/tasks";

const TOTAL_REQUESTS = 100;
const CONCURRENCY = 10;

const responseTimes = [];
let nextRequest = 0;
let successful = 0;
let failed = 0;

const startMemory = process.memoryUsage().rss;
const startCpu = process.cpuUsage();
const testStart = process.hrtime.bigint();

function sendRequest() {
    return new Promise((resolve) => {
        const requestNumber = nextRequest++;
        const start = process.hrtime.bigint();

        const request = http.get(
            {
                hostname: HOST,
                port: PORT,
                path: PATH,
                method: "GET"
            },
            (response) => {
                response.resume();

                response.on("end", () => {
                    const end = process.hrtime.bigint();
                    const responseTime =
                        Number(end - start) / 1_000_000;

                    responseTimes.push(responseTime);

                    if (
                        response.statusCode >= 200 &&
                        response.statusCode < 300
                    ) {
                        successful++;
                    } else {
                        failed++;
                    }

                    resolve(requestNumber);
                });
            }
        );

        request.on("error", () => {
            failed++;
            resolve(requestNumber);
        });
    });
}

async function runWorker() {
    while (true) {
        if (nextRequest >= TOTAL_REQUESTS) {
            return;
        }

        await sendRequest();
    }
}

async function runTest() {
    console.log("========================================");
    console.log("AI-Assisted InternTrack");
    console.log("Week 5 Performance Test");
    console.log("========================================");
    console.log(`Target: http://${HOST}:${PORT}${PATH}`);
    console.log(`Total Requests: ${TOTAL_REQUESTS}`);
    console.log(`Concurrency: ${CONCURRENCY}`);
    console.log("----------------------------------------");

    const workers = [];

    for (let i = 0; i < CONCURRENCY; i++) {
        workers.push(runWorker());
    }

    await Promise.all(workers);

    const testEnd = process.hrtime.bigint();
    const totalTimeMs =
        Number(testEnd - testStart) / 1_000_000;

    const endMemory = process.memoryUsage().rss;
    const cpuUsage = process.cpuUsage(startCpu);

    responseTimes.sort((a, b) => a - b);

    const average =
        responseTimes.length > 0
            ? responseTimes.reduce((sum, value) => sum + value, 0) /
              responseTimes.length
            : 0;

    const min = responseTimes.length > 0
        ? responseTimes[0]
        : 0;

    const max = responseTimes.length > 0
        ? responseTimes[responseTimes.length - 1]
        : 0;

    const percentile = (percent) => {
        if (responseTimes.length === 0) {
            return 0;
        }

        const index = Math.ceil(
            (percent / 100) * responseTimes.length
        ) - 1;

        return responseTimes[Math.max(0, index)];
    };

    const p50 = percentile(50);
    const p95 = percentile(95);
    const p99 = percentile(99);

    const requestsPerSecond =
        successful / (totalTimeMs / 1000);

    const memoryChangeMB =
        (endMemory - startMemory) / (1024 * 1024);

    const cpuTimeMs =
        (cpuUsage.user + cpuUsage.system) / 1000;

    console.log("");
    console.log("PERFORMANCE RESULTS");
    console.log("----------------------------------------");
    console.log(`Requests Sent       : ${nextRequest}`);
    console.log(`Successful Requests : ${successful}`);
    console.log(`Failed Requests     : ${failed}`);
    console.log(`Total Test Time     : ${totalTimeMs.toFixed(2)} ms`);
    console.log(`Requests/Second     : ${requestsPerSecond.toFixed(2)}`);
    console.log(`Average Response    : ${average.toFixed(2)} ms`);
    console.log(`Minimum Response    : ${min.toFixed(2)} ms`);
    console.log(`Maximum Response    : ${max.toFixed(2)} ms`);
    console.log(`P50 Response        : ${p50.toFixed(2)} ms`);
    console.log(`P95 Response        : ${p95.toFixed(2)} ms`);
    console.log(`P99 Response        : ${p99.toFixed(2)} ms`);
    console.log(`Memory Change       : ${memoryChangeMB.toFixed(2)} MB`);
    console.log(`CPU Time            : ${cpuTimeMs.toFixed(2)} ms`);
    console.log("----------------------------------------");
    console.log("Performance test completed.");
    console.log("========================================");
}

runTest();