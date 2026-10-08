# Week 5 Performance Evaluation Results

## 1. Test Environment

- Application: AI-Assisted InternTrack Task Management API
- Runtime: Node.js
- Framework: Express.js
- Database: PostgreSQL
- Server: Local development environment
- Server Port: 5000
- Performance Script: `scripts/performance-test.js`
- Total Requests per Test: 100
- Concurrency: 10

---

## 2. Health Endpoint Performance

### Endpoint

`GET /api/health`

### Results

| Metric | Result |
|---|---:|
| Requests Sent | 100 |
| Successful Requests | 100 |
| Failed Requests | 0 |
| Total Test Time | 154.34 ms |
| Requests per Second | 647.94 |
| Average Response Time | 12.28 ms |
| Minimum Response Time | 0.56 ms |
| Maximum Response Time | 98.46 ms |
| P50 Response Time | 10.30 ms |
| P95 Response Time | 20.91 ms |
| P99 Response Time | 32.68 ms |
| Memory Change | 5.81 MB |
| CPU Time | 78 ms |

### Observation

The health endpoint handled all 100 requests successfully without any failed requests. The average response time was 12.28 ms, while the P95 response time was 20.91 ms. The endpoint achieved a measured throughput of 647.94 requests per second during this local performance test.

---

## 3. Task API Performance

### Endpoint

`GET /api/tasks`

### Results

| Metric | Result |
|---|---:|
| Requests Sent | 100 |
| Successful Requests | 100 |
| Failed Requests | 0 |
| Total Test Time | 391.47 ms |
| Requests per Second | 255.45 |
| Average Response Time | 35.76 ms |
| Minimum Response Time | 7.48 ms |
| Maximum Response Time | 327.54 ms |
| P50 Response Time | 15.78 ms |
| P95 Response Time | 208.68 ms |
| P99 Response Time | 266.58 ms |
| Memory Change | 6.12 MB |
| CPU Time | 156 ms |

### Observation

The Task API successfully handled all 100 requests. The endpoint was slower than the health endpoint because it performs a database query against PostgreSQL.

The average response time was 35.76 ms. However, the P95 response time was 208.68 ms and the maximum response time reached 327.54 ms. This indicates that some requests experienced higher latency during concurrent database access.

---

## 4. Performance Comparison

| Metric | `/api/health` | `/api/tasks` |
|---|---:|---:|
| Successful Requests | 100 | 100 |
| Failed Requests | 0 | 0 |
| Average Response | 12.28 ms | 35.76 ms |
| P95 Response | 20.91 ms | 208.68 ms |
| P99 Response | 32.68 ms | 266.58 ms |
| Throughput | 647.94 req/s | 255.45 req/s |
| Memory Change | 5.81 MB | 6.12 MB |
| CPU Time | 78 ms | 156 ms |

---

## 5. Performance Findings

1. Both tested endpoints successfully processed all 100 requests.
2. The health endpoint showed lower latency because it does not access the database.
3. The Task API showed higher latency because it performs PostgreSQL database operations.
4. The Task API P95 and P99 latency values were significantly higher than its average response time.
5. No request failures were observed during either test.
6. The measured results represent a local development environment and should not be treated as production benchmarks.

---

## 6. Recommended Optimizations

Based on the observed results, the following improvements can be considered:

- Review and optimize frequently executed PostgreSQL queries.
- Add appropriate database indexes when query patterns justify them.
- Monitor database connection pool usage under higher loads.
- Avoid unnecessary database queries and data processing.
- Use pagination for large task datasets.
- Repeat performance testing with larger request volumes before production deployment.
- Monitor CPU, memory, database latency, and response time in the production environment.

---

## 7. Testing Limitations

The tests were performed on a local development machine using a limited request count of 100 requests and concurrency of 10.

The results can vary depending on:

- Computer hardware
- PostgreSQL performance
- Network conditions
- Database size
- Number of concurrent users
- Node.js process state

Therefore, these results should be considered baseline performance measurements rather than production capacity limits.

---

## 8. Conclusion

The performance evaluation confirmed that the AI-Assisted InternTrack API handled the tested workload successfully with zero failed requests. The health endpoint demonstrated low response latency, while the database-backed Task API showed higher latency under concurrent requests.

The performance results provide a baseline for future optimization and deployment testing. Further load testing with larger workloads and production-like infrastructure is recommended before real-world deployment.