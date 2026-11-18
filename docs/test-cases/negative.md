# Negative - Test Cases

**Module:** Negative
**Automation:** Postman folder "Negative" in `collections/JSONPlaceholder.postman_collection.json` (run by Newman)  |  **Report:** `reports/negative/Negative test <DD-MM-YYYY>_<HH-mm-ss>.html` (all reports: `reports/index.html`)
**Service:** https://jsonplaceholder.typicode.com (environment variable `baseUrl`)

## Overview
Requests for things that do not exist.

## A. Missing resources

| ID | Title | Priority | Type | Preconditions | Test data | Steps | Expected result | Automated in |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC_NEGATIVE_01 | GET /posts/9999 returns status 404 and an empty object | High | Negative | None | Post id 9999 | 1. Send GET {{baseUrl}}/posts/9999. | Status 404 and the body is an empty object. | `collections/JSONPlaceholder.postman_collection.json::TC_NEGATIVE_01 - GET /posts/9999 returns status 404 and an empty object` |
| TC_NEGATIVE_02 | GET /does-not-exist returns status 404 | Medium | Negative | None | Path /does-not-exist | 1. Send GET {{baseUrl}}/does-not-exist. | Status 404. | `collections/JSONPlaceholder.postman_collection.json::TC_NEGATIVE_02 - GET /does-not-exist returns status 404` |

## Summary

| Cases | High priority | Automated |
| --- | --- | --- |
| 2 | 1 | 2 |
