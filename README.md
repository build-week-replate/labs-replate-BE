# labs-replate-BE

Here app description

## Technology Stack

- Server: Node.js | Express
- Authentication: Bcryptjs & JsonWebToken
- Database Builder: Knex.js
- Production Database: PostgreSQL
- Package management: yarn

## Add instructions on how to run the server locally

# RESTful API

## User Endpoints

### Register new user - POST

https://replate-backend-turcan.herokuapp.com/api/users

```
Arguments
{
	"type": "string", // can be either company or volunteer
	"name": "string", // is unique
	"phone": integer,
	"email": "string", // is unique
	"password": "string"
}
```

```
Return
{
    "user": {
        "id": 2,
        "name": "test volunteer name 1",
        "email": "b@b.com",
        "phone": 2345678976543,
        "type": "volunteer",
        "password": "$2a$08$Ehjfxw30Er0ayIzi8JdDZOPiIcrtxIG6grxBpXYoERKIl5fi2cxTm"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJuYW1lIjoidGVzdCB2b2x1bnRlZXIgbmFtZSAxIiwidHlwZSI6InZvbHVudGVlciIsImlhdCI6MTU1NTMzODgxMCwiZXhwIjoxNTU1NDI1MjEwfQ.eqBHAfae-akB6KyE-p8JRhYZEnLJFtTk3QggooYIaE4"
}
```

### Login existing user - POST

https://replate-backend-turcan.herokuapp.com/api/users/login

```
Arguments
  {
    "email": “string",
    "password": “string"
  }
```

```
Return
{
    "user": {
        "id": 1,
        "name": "test company name 1",
        "email": "a@a.com",
        "phone": 2345678976543,
        "type": "company",
        "password": "$2a$08$pfgKJgNmQbj/enJxoTgxQ.VfPxUfjy523yW1a1pMcTdi7keZl.rC."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJuYW1lIjoidGVzdCBjb21wYW55IG5hbWUgMSIsInR5cGUiOiJjb21wYW55IiwiaWF0IjoxNTU1MzQ3MjE0LCJleHAiOjE1NTU0MzM2MTR9.3FdAaqvM597Qs1SjyrnnkH_fT9kfcv4If_QidO39miE"
}
```

### Get all users - GET - RESTRICTED

https://replate-backend-turcan.herokuapp.com/api/users

```
Return
  [
    {
        "id": 1,
        "name": "test company name 1",
        "email": "a@a.com",
        "phone": 2345678976543,
        "type": "company",
        "password": "$2a$08$pfgKJgNmQbj/enJxoTgxQ.VfPxUfjy523yW1a1pMcTdi7keZl.rC."
    },
    {
        "id": 2,
        "name": "test volunteer name 1",
        "email": "b@b.com",
        "phone": 2345678976543,
        "type": "volunteer",
        "password": "$2a$08$Ehjfxw30Er0ayIzi8JdDZOPiIcrtxIG6grxBpXYoERKIl5fi2cxTm"
    },
    ...
]
```

### Get user by id - GET - RESTRICTED

https://replate-backend-turcan.herokuapp.com/api/users/:id

```
Return
  {
    "id": 1,
    "name": "test company name 1",
    "email": "a@a.com",
    "phone": 2345678976543,
    "type": "company",
    "password": "$2a$08$pfgKJgNmQbj/enJxoTgxQ.VfPxUfjy523yW1a1pMcTdi7keZl.rC."
}
```

## Location Endpoints

### GET the locations of a specific company - RESTRICTED

https://replate-backend-turcan.herokuapp.com/api/locations/:companyId

```
[
    {
        "id": 1,
        "office_name": "Apple",
        "office_address": "Cupertino, CA",
        "office_email": null,
        "company_id": 1
    }
]
```

### POST add a location to a specific company - RESTRICTED

https://replate-backend-turcan.herokuapp.com/api/locations

```
    {
        "office_name": "string"
        "office_address": "string"
        "office_email": "string" // optional
    }
```

## Schedule endpoints

### POST add a schedule - RESTRICTED

https://replate-backend-turcan.herokuapp.com/api/schedules

```
{
	"pickup_name": "string",
	"pickup_date": "string",
	"pickup_time": "string",
	"pickup_comment": "string",
    "pickup_additional_comment": "string" // optional
}

```

```
    Returns the schedule id
    [
        id
    ]
```

### GET retrieve all of the schedules ever posted - RESTRICTED

https://replate-backend-turcan.herokuapp.com/api/schedules

```
[
    {
        "id": 1,
        "pickup_name": "whatever",
        "pickup_date": "14 september",
        "pickup_time": "midnight",
        "pickup_comment": "this is a test comment",
        "pickup_additional_comment": null, // can be a string
        "taken": 0, // defaults to 0 for false and to 1 for true
        "volunteer_id": null, // will be completed once a volunteer takes the schedule
        "company_id": 1 // is automatically set in when posting a schedule
    }
]
```

### PATCH edit a schedule - RESTRICTED

https://replate-backend-turcan.herokuapp.com/api/schedules/:id

where id is the one of a schedule

```
{
	"pickup_name": "string",
	"pickup_date": "string",
	"pickup_time": "string",
	"pickup_comment": "string",
    "pickup_additional_comment": "string" // optional
}
```

### PATCH take a schedule - RESTRICTED

https://replate-backend-turcan.herokuapp.com/api/schedules/:id/take

It is an empty request, all you have to do is provide the token.

NOTE: A company can not take a schedule, it must be a volunteer
