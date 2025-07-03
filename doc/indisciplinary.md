# Indisciplinary API specification

## Create Indisciplinary API

Endpoint: POST /api/indisciplinary

Headers:

- Authorization: token

Body Request:

```json
{
  "employeeId": 5,
  "letterNumber": "SK-002",
  "indisciplinaryName": "Absent Without Notice",
  "description": "Absent 2 days without permission"
}
```

Body Response Success:

```json
{
  "message": "Indisciplinary record created successfully.",
  "data": {
    "id": 1,
    "employeeId": 5,
    "letterNumber": "SK-002",
    "indisciplinaryName": "Absent Without Notice",
    "description": "Absent 2 days without permission"
  }
}
```

Body Response error:

```json
{
  "errors": "Field 'indisciplinaryName' must be a valid string"
}
```

## Get All indisciplinary API

Endpoint: GET /api/indisciplinary

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": [
    {
      "id": 1,
      "employeeId": 5,
      "letterNumber": "SK-002",
      "indisciplinaryName": "Absent Without Notice",
      "description": "Absent 2 days without permission"
    },
    {
      "id": 2,
      "employeeId": 6,
      "letterNumber": "SK-003",
      "indisciplinaryName": "Late Submission",
      "description": "Report submitted 1 day late"
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

## Get Single indisciplinary API

Endpoint: GET /api/indisciplinary/:id

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": {
    "id": 1,
    "employeeId": 5,
    "letterNumber": "SK-002",
    "indisciplinaryName": "Absent Without Notice",
    "description": "Absent 2 days without permission"
  }
}
```

Body Response error:

```json
{
  "errors": "Unauthorized"
}
```

## Update indisciplinary API

Endpoint: PUT /api/indisciplinary/:id

Headers:

- Authorization: token

Body Request:

```json
{
  "employeeId": 5,
  "letterNumber": "SK-002",
  "indisciplinaryName": "Absent Without Notice",
  "description": "Absent 2 days without permission"
}
```

Body Response Success:

```json
{
  "message": "Indisciplinary record updated successfully.",
  "data": {
    "id": 1,
    "employeeId": 5,
    "letterNumber": "SK-003",
    "indisciplinaryName": "Unauthorized Leave",
    "description": "Left work early without permission"
  }
}
```

Body Response error:

```json
{
  "errors": "Record not found for update"
}
```

## Search indisciplinary API

Endpoint: GET /api/indisciplinary

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
      "id": 1,
      "employeeId": 5,
      "letterNumber": "SK-002",
      "indisciplinaryName": "Absent Without Notice",
      "description": "Absent 2 days without permission"
    },
    {
      "id": 2,
      "employeeId": 6,
      "letterNumber": "SK-003",
      "indisciplinaryName": "Late Submission",
      "description": "Report submitted 1 day late"
    }
  ],

  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

## Delete indisciplinary API

Endpoint: Delete /api/indisciplinary/:id

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
  "errors": "unauthorize"
}
```
