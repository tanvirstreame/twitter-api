# Twitter api with express js

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

# Features

  - Sign up / login
  - Create tweets
  - Follow other users
  - Fetch their tweets
  - See tweets from people who they follow
 
## Tech
* Express JS
* Type Script

### Installation
Install the dependencies and devDependencies and start the server.
```sh
$ npm install
```
Running the backend project...

```sh
$ npm run dev
```
Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8080
```
Running seed...
```sh
$ npm run seed
```

Running test...
```sh
$ npm run test
```


## Endpoints

```http
POST /api/v1/users/signup
POST /api/v1/users/login
POST /api/v1/follows/:userId
POST /api/v1/tweets
GET /api/v1/tweets
GET /api/v1/tweets?limit=10&offset=0
GET /api/v1/tweets/feeds
GET /api/v1/tweets/feeds?limit=10&offset=0
```
## Responses

```javascript
{
    "data": [],
    "totalCount": 0,
    "itemPerPage": 10,
    "totalPage": 1,
    "success": true
}
```

```javascript
{
    "message": "Tweet saved successfully",
    "success": true
}
```

```javascript
{
    "token": "Bearer <token>",
    "message": "User registered successfully",
    "success": true
}
```

## Status Codes


| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |

License
----

MIT
