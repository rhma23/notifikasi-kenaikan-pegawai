# Grades API specification

## Create Grades API

Endpoint: POST /api/grades

Headers:

- Authorization: token

Body Request:

```json
{
  "baseSalaryId": 2,
  "gradeName": "Penata Muda",
  "type": "III/a"
}
```

Body Response Success:

```json
{
  "data": {
    "gradeId": 1,
    "baseSalaryId": 2,
    "gradeName": "Penata Muda",
    "type": "III/a"
  }
}
```

Body Response error:

```json
{
  "errors": "Field 'gradeName' must be a valid string"
}
```

## Get All Grades API

Endpoint: GET /api/grades

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": [
    {
      "gradeId": 1,
      "baseSalaryId": 2,
      "gradeName": "Penata Muda",
      "type": "III/a"
    },
    {
      "gradeId": 2,
      "baseSalaryId": 3,
      "gradeName": "Penata Madya",
      "type": "III/b"
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

## Get Single Salary API

Endpoint: GET /api/grades/:id

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": {
    "gradeId": 1,
    "baseSalaryId": 2,
    "gradeName": "Junior Rank",
    "type": "III/a"
  }
}
```

Body Response error:

```json
{
  "errors": "Unauthorized"
}
```

## Update Salary API

Endpoint: PUT /api/grades/:id

Headers:

- Authorization: token

Body Request:

```json
{
  "baseSalaryId": 2,
  "gradeName": "Penata Muda",
  "type": "III/a"
}
```

Body Response Success:

```json
{
  "data": {
    "gradeId": 1,
    "baseSalaryId": 2,
    "gradeName": "Penata Muda",
    "type": "III/a"
  }
}
```

Body Response error:

```json
{
  "errors": "Grade data not found"
}
```

## Search Salary API

Endpoint: GET /api/grades

Headers:

- Authorization: token

Query params :

- gradeName : Search by grade name, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Body Response Success:

```json
{
  "data": [
    {
      "gradeId": 1,
      "baseSalaryId": 2,
      "gradeName": "Penata Muda",
      "type": "III/a"
    },
    {
      "gradeId": 2,
      "baseSalaryId": 3,
      "gradeName": "Penata Madya",
      "type": "III/b"
    }
  ],

  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

## Delete Salary API

Endpoint: Delete /api/grades/:id

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
  "errors": " Grade data not found"
}
```
