# Division API specification

## Create Division API

Endpoint: POST /api/division

Headers:

- Authorization: token

Body Request:

```json
{
  "divisionName": "IT"
}
```

Body Response Success:

```json
{
  "data": {
    "divisionId": "1",
    "divisionName": "IT"
  }
}
```

Body Response error:

```json
{
  "errors": "Division Name can't be empty"
}
```

## Get All Division API

Endpoint: GET /api/division

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": [
    {
      "divisionId": "1",
      "divisionName": "IT"
    },
    {
      "divisionId": "2",
      "divisionhName": "Kepegawaian"
    },
    {
      "divisionId": "3",
      "DivisionName": "Umum"
    }
  ]
}
```

Body Response error:

```json
{
  "errors": "Unauthorized"
}
```

## Get Single Division API

Endpoint: GET /api/division/:id

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": {
    "divisionId": "1",
    "divisionName": "Kepegawaian"
  }
}
```

Body Response error:

```json
{
  "errors": "Unauthorized"
}
```

## Update Division API

Endpoint: PUT /api/division/:id

Headers:

- Authorization: token

Body Request:

```json
{
  "divisionName": "Kepegawaian"
}
```

Body Response Success:

```json
{
  "data": {
    "divisionId": "1",
    "divisionName": "Kepegawaian"
  }
}
```

Body Response error:

```json
{
  "errors": "Division Name can't be empty"
}
```

## Search Division API

Endpoint: GET /api/division

Headers:

- Authorization: token

Query params :

- divisionName : Search by divisionName, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Body Response Success:

```json
{
  "data": [
    {
      "divisionId": 1,
      "divisionName": "IT"
    },
    {
      "divisionId": 2,
      "divisionName": "Kalijati"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

## Delete Division API

Endpoint: Delete /api/division/:id

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": "OK"
}
```

Body Response error:

```json
{
  "errors": "Division is not found"
}
```
