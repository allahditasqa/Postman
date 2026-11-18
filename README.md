# Postman

**Automation Framework:** Postman collection + environment with test assertions, executed from the command line with Newman, with test case documents and module-wise reports. Target: the public fake API [JSONPlaceholder](https://jsonplaceholder.typicode.com).

## What is covered
- **Posts**: GET all / by id (JSON-schema check) / filtered, POST, PUT, PATCH, DELETE
- **Users**: GET by id with field + email-format assertions
- **Negative**: 404 for a missing post and an unknown route
- Assertions on status codes, response time, headers and body values; a value from one response is saved as an environment variable (`createdId`).

> JSONPlaceholder does not persist writes, so the tests check the response contract only.

## Structure
```
Postman/
├── collections/JSONPlaceholder.postman_collection.json   # 10 requests, request name = "TC_<MODULE>_<NN> - <title>"
├── environments/jsonplaceholder.postman_environment.json
├── docs/
│   ├── TEST_CASE_STANDARD.md   TEST_STRATEGY.md
│   └── test-cases/             # posts.md/.csv  users.md/.csv  negative.md/.csv
├── tools/
│   ├── run-newman.js           # Newman run per folder -> module-wise reports
│   ├── report-lib.js           # HTML / CSV / history writer
│   └── docs.js                 # master CSV generator + traceability check
├── reports/                    # reports of a real run (index.html, history.json, one folder per module)
├── package.json
└── .github/workflows/newman.yml
```

## Run
Import the collection and environment into Postman, **or** use Newman (Node 18+):
```bash
npm install
npm test                 # plain Newman CLI output
npm run test:report      # one Newman run per folder + module-wise HTML/CSV reports in reports/
```
Or without installing: `npx newman run collections/JSONPlaceholder.postman_collection.json -e environments/jsonplaceholder.postman_environment.json`

## Test cases
Every request is one documented test case (the ID is the start of the request name), in the standard described in [docs/TEST_CASE_STANDARD.md](docs/TEST_CASE_STANDARD.md) (strategy: [docs/TEST_STRATEGY.md](docs/TEST_STRATEGY.md)). The expected result of a case is what the assertions of the request check.

| Module (Postman folder) | Document | Master CSV | Cases |
|--------|----------|-----------|-------|
| Posts | [posts.md](docs/test-cases/posts.md) | [posts.csv](docs/test-cases/posts.csv) | 7 |
| Users | [users.md](docs/test-cases/users.md) | [users.csv](docs/test-cases/users.csv) | 1 |
| Negative | [negative.md](docs/test-cases/negative.md) | [negative.csv](docs/test-cases/negative.csv) | 2 |
| **Total** | | | **10** (all automated) |

The Markdown documents are the source of truth. After editing them:
```bash
npm run docs:csv      # regenerate the master CSVs
npm run docs:check    # fails when documents, CSVs and request IDs drift apart (also runs in CI)
```

## Reports
`npm run test:report` runs Newman once per folder (= module) and writes the reports of the real run - never edited by hand, old runs are kept:
```
reports/
├── index.html            # history, newest run first
├── history.json
└── posts/  users/  negative/
    ├── <Module> test <DD-MM-YYYY>_<HH-mm-ss>.html         # self-contained, one card per test case
    └── <Module> test cases <DD-MM-YYYY>_<HH-mm-ss>.csv     # steps, expected result and the REAL result
```
The actual result of every case lists the request, the HTTP status, the response time and each assertion with ok / FAIL. Open [reports/index.html](reports/index.html) after cloning (GitHub shows HTML as text). Postman has no screenshots, so the report cards do not contain images.
