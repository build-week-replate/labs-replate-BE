/**
 * @api {get} /api/users Request Users information
 * @apiName GetUsers
 * @apiGroup User
 *
 *
 * @apiSuccess {Integer} id Id of a user
 * @apiSuccess {String} name Name of the volunteer or the company.
 * @apiSuccess {String} email  email used to register
 * @apiSuccess {Integer} phone Phone used to register
 * @apiSuccess {String} type Type of a user, can be either company or volunteer
 * @apiSuccess {String} password password user used for registering, but hashed
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
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
    }
]
 *
 */

/**
 * @api {post} /api/users/ Create a new user or register
 * @apiName Register
 * @apiGroup User
 *
 * @apiParam {String} [name] name of the company or volunteer, must be unique
 * @apiParam {String} [email]  email used to register, must be unique
 * @apiParam {Integer} [phone] Phone used to register
 * @apiParam {String} [type] Type of a user, can be either company or volunteer
 * @apiParam {String} [password] password of a user used for registering
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
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
 *
 */

/**
 * @api {get} /api/users/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Integer} id Id of a user
 * @apiSuccess {String} name Name of the volunteer or the company.
 * @apiSuccess {String} email  email used to register
 * @apiSuccess {Integer} phone Phone used to register
 * @apiSuccess {String} type Type of a user, can be either company or volunteer
 * @apiSuccess {String} password password user used for registering, but hashed
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
        "id": 1,
        "name": "test company name 1",
        "email": "a@a.com",
        "phone": 2345678976543,
        "type": "company",
        "password": "$2a$08$pfgKJgNmQbj/enJxoTgxQ.VfPxUfjy523yW1a1pMcTdi7keZl.rC."
    }
 *
 */

/**
 * @api {post} /api/login/ Login the user
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} [email]  email used to register, must be unique
 * @apiParam {String} [password] password of a user used for registering
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
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
 *
 */
