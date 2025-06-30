# User Api specification

## Create User API

End Point: POST /api/users/create

Request Body:

```json
{
  "username": "user123",
  "password": "rahasia123",
  "email": "user@gmail.com",
  "role": "admin"
}
```

Response Body Success:

```json
{
  "data": {
    "username": "user123",
    "email": "user@gmail.com",
    "role": "admin"
  }
}
```

Response Body Erros:

```json
{
  "errors": "username already registered"
}
```

## Login User API

End Point: POST /api/users/login

Request Body:

```json
{
  "username": "user123",
  "password": "rahasia123"
}
```

Response Body Success:

```json
{
  "data": {
    "token": "uniqe-token"
  }
}
```

Response Body Erros:

```json
{
  "errors": "username or password is wrong"
}
```

## Get User API

End Point: Get /api/users/current

Headers:

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "username": "user123",
    "email": "user@gmail.com",
    "role": "admin"
  }
}
```

Response Body Erros:

```json
{
  "errors": "Unauthorize"
}
```

## Get All User API

End Point: Get /api/users/current

Headers:

- Authorization : token

Response Body Success:

```json
{
  "data": [
    {
      "username": "user123",
      "email": "user@gmail.com",
      "role": "admin"
    },
    {
      "username": "user456",
      "email": "user456@gmail.com",
      "role": "direksi"
    },
    {
      "username": "user789",
      "email": "user789@gmail.com",
      "role": "admin"
    }
  ]
}
```

Response Body Erros:

```json
{
  "errors": "Unauthorize"
}
```

## Update User API

Endpoint: PATCH /api/users/current

Headers:

- Authorization : token

```json
{
  "username": "user123update",
  "password": "rahasia123update",
  "email": "update@gmail.com",
  "role": "direksi"
}
```

Response Body Success:

```json
{
  "data": {
    "username": "user123update",
    "password": "rahasia123update",
    "email": "update@gmail.com",
    "role": "direksi"
  }
}
```

Response Body Erros:

```json
{
  "errors": "username is invalid"
}
```

## Logout User API

End Point: Get /api/users/logout

Headers:

- Authorization : token

Response Body Success:

```json
{
  "data": "Ok"
}
```

Response Body Erros:

```json
{
  "errors": "Unauthorize"
}
```
