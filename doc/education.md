# Education API specification

## Create Education API

Endpoint: POST /api/education

Headers:

- Authorization: token

Body Request:

```json
{
  "level": "S1",
  "major": "Sistem Informasi"
}
```

Body Response Success:

```json
{
  "data": {
    "educationId": 1,
    "level": "S1",
    "major": "Sistem Informasi"
  }
}
```

Body Response error:

```json
{
  "errors": "Fields 'level' and 'major' are required."
}
```

## Get All education API

Endpoint: GET /api/education

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": [
    {
      "educationId": 1,
      "level": "S1",
      "major": "Sistem Informasi"
    },
    {
      "educationId": 2,
      "level": "SMA",
      "major": "IPA"
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

## Get Single education API

Endpoint: GET /api/education/:id

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": {
    "educationId": "1",
    "level": "SMA",
    "major": "IPA"
  }
}
```

Body Response error:

```json
{
  "errors": "Unauthorized"
}
```

## Update education API

Endpoint: PUT /api/education/:id

Headers:

- Authorization: token

Body Request:

```json
{
  "educationName": "Kepegawaian"
}
```

Body Response Success:

```json
{
  "data": {
    "educationId": "1",
    "level": "S1",
    "major": "Sistem Informasi"
  }
}
```

Body Response error:

```json
{
  "errors": "Education data not found"
}
```

## Search education API

Endpoint: GET /api/education

Headers:

- Authorization: token

Query params :

- major : Search by major, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Body Response Success:

```json
{
  "data": [
    {
      "educationId": 1,
      "level": "S1",
      "major": "Sistem Informasi"
    },
    {
      "educationId": 2,
      "level": "SMA",
      "major": "IPA"
    }
  ],

  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

## Delete education API

Endpoint: Delete /api/education/:id

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
  "errors": "Education data not found"
}
```
