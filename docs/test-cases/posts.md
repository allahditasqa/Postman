# Posts - Test Cases

**Module:** Posts
**Automation:** Postman folder "Posts" in `collections/JSONPlaceholder.postman_collection.json` (run by Newman)  |  **Report:** `reports/posts/Posts test <DD-MM-YYYY>_<HH-mm-ss>.html` (all reports: `reports/index.html`)
**Service:** https://jsonplaceholder.typicode.com (environment variable `baseUrl`)

## Overview
CRUD checks of the `/posts` resource. Each test case is one request of the collection; the request name starts with the test case ID. The expected result is what the request's test script asserts. JSONPlaceholder is a fake API: writes are echoed back but not stored.

## A. Read

| ID | Title | Priority | Type | Preconditions | Test data | Steps | Expected result | Automated in |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC_POSTS_01 | GET /posts returns status 200 and 100 posts | High | Functional | None | None | 1. Send GET {{baseUrl}}/posts. | Status 200, response time under 3000 ms, content type contains application/json and the list has 100 posts. | `collections/JSONPlaceholder.postman_collection.json::TC_POSTS_01 - GET /posts returns status 200 and 100 posts` |
| TC_POSTS_02 | GET /posts/1 returns post 1 that matches the JSON schema | High | Schema | None | Environment variable postId = 1 | 1. Send GET {{baseUrl}}/posts/{{postId}}. | Status 200. The body matches the schema (userId, id, title, body) and its id equals postId. | `collections/JSONPlaceholder.postman_collection.json::TC_POSTS_02 - GET /posts/1 returns post 1 that matches the JSON schema` |
| TC_POSTS_03 | GET /posts?userId=1 returns 10 posts that all belong to user 1 | Medium | Functional | None | Query userId=1 | 1. Send GET {{baseUrl}}/posts?userId=1. | Status 200. 10 posts are returned and every post has userId 1. | `collections/JSONPlaceholder.postman_collection.json::TC_POSTS_03 - GET /posts?userId=1 returns 10 posts that all belong to user 1` |

## B. Write

| ID | Title | Priority | Type | Preconditions | Test data | Steps | Expected result | Automated in |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC_POSTS_04 | POST /posts creates a post and returns status 201 with the new id 101 | High | Functional | None | title "QA demo", body "created from Postman", userId 7 | 1. Send POST {{baseUrl}}/posts with the JSON body. | Status 201. The answer has title "QA demo", userId 7 and the id 101. The id is saved in the variable createdId. | `collections/JSONPlaceholder.postman_collection.json::TC_POSTS_04 - POST /posts creates a post and returns status 201 with the new id 101` |
| TC_POSTS_05 | PUT /posts/1 replaces the post and returns status 200 | Medium | Functional | None | id 1, title "updated title", body "updated body", userId 1 | 1. Send PUT {{baseUrl}}/posts/1 with the JSON body. | Status 200 and the title is "updated title". | `collections/JSONPlaceholder.postman_collection.json::TC_POSTS_05 - PUT /posts/1 replaces the post and returns status 200` |
| TC_POSTS_06 | PATCH /posts/1 changes only the title and returns status 200 | Medium | Functional | None | title "patched" | 1. Send PATCH {{baseUrl}}/posts/1 with the JSON body {"title": "patched"}. | Status 200. The title is "patched" and the id is 1. | `collections/JSONPlaceholder.postman_collection.json::TC_POSTS_06 - PATCH /posts/1 changes only the title and returns status 200` |
| TC_POSTS_07 | DELETE /posts/1 returns status 200 | Medium | Functional | None | Post id 1 | 1. Send DELETE {{baseUrl}}/posts/1. | Status 200. | `collections/JSONPlaceholder.postman_collection.json::TC_POSTS_07 - DELETE /posts/1 returns status 200` |

## Summary

| Cases | High priority | Automated |
| --- | --- | --- |
| 7 | 3 | 7 |
