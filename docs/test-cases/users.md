# Users - Test Cases

**Module:** Users
**Automation:** Postman folder "Users" in `collections/JSONPlaceholder.postman_collection.json` (run by Newman)  |  **Report:** `reports/users/Users test <DD-MM-YYYY>_<HH-mm-ss>.html` (all reports: `reports/index.html`)
**Service:** https://jsonplaceholder.typicode.com (environment variable `baseUrl`)

## Overview
Read check of one user, including the structure of the answer.

## A. Read

| ID | Title | Priority | Type | Preconditions | Test data | Steps | Expected result | Automated in |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC_USERS_01 | GET /users/1 returns the user Bret with a valid email | High | Functional | None | User id 1 | 1. Send GET {{baseUrl}}/users/1. | Status 200. The user has exactly the fields id, name, username, email, address, phone, website and company, the email looks valid and the username is "Bret". | `collections/JSONPlaceholder.postman_collection.json::TC_USERS_01 - GET /users/1 returns the user Bret with a valid email` |

## Summary

| Cases | High priority | Automated |
| --- | --- | --- |
| 1 | 1 | 1 |
