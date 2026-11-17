# Postman

**Automation Framework:** Postman collection + environment with test assertions, executed from the command line with Newman, against the public fake API [JSONPlaceholder](https://jsonplaceholder.typicode.com).

## What is covered
- **Posts**: GET all / by id (JSON-schema check) / filtered, POST, PUT, PATCH, DELETE
- **Users**: GET by id with field + email-format assertions
- **Negative**: 404 for a missing post and an unknown route
- Assertions on status codes, response time, headers, body values; a value from one response is saved as an environment variable (`createdId`).

> JSONPlaceholder does not persist writes, so the tests check the response contract only.

## Structure
```
Postman/
├── collections/JSONPlaceholder.postman_collection.json
├── environments/jsonplaceholder.postman_environment.json
├── package.json            # npm scripts running Newman
└── .github/workflows/newman.yml
```

## Run
Import the collection and environment into Postman, **or** run with Newman:
```bash
npm install
npm test                 # CLI report
npm run test:report      # CLI + HTML report in reports/report.html
```
Or without installing: `npx newman run collections/JSONPlaceholder.postman_collection.json -e environments/jsonplaceholder.postman_environment.json`
