# Recommendation API specification

## Create Recommendation API

Endpoint: POST /api/recommendations

Headers:

- Authorization: token

Body Request:

```json
{
  "employeeId": 10,
  "userId": 3,
  "recommendationDate": "2025-06-01",
  "recommendationStatus": "approved",
  "processDate": "2025-06-03",
  "fileCode": "REC-2025-001",
  "recommendationType": "gaji"
}
```

Body Response Success:

```json
{
  "message": "Recommendation created successfully.",
  "data": {
    "id": 1,
    "employeeId": 10,
    "userId": 3,
    "recommendationDate": "2025-06-01",
    "recommendationStatus": "approved",
    "processDate": "2025-06-03",
    "fileCode": "REC-2025-001",
    "promotion": "promotion"
  }
}
```

Body Response error:

```json
{
  "errors": "Field 'promotion' must be valid string"
}
```

## Get All recommendations API

Endpoint: GET /api/recommendations

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": [
    {
      "id": 1,
      "employeeId": 10,
      "userId": 3,
      "recommendationDate": "2025-06-01",
      "recommendationStatus": "approved",
      "processDate": "2025-06-03",
      "fileCode": "REC-2025-001",
      "recommendationType": "gaji"
    },
    {
      "id": 2,
      "employeeId": 8,
      "userId": 3,
      "recommendationDate": "2025-06-01",
      "recommendationStatus": "approved",
      "processDate": "2025-06-03",
      "fileCode": "REC-2025-001",
      "recommendationType": "pangkat"
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

## Get Single recommendations API

Endpoint: GET /api/recommendations/:id

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": {
    "id": 1,
    "employeeId": 10,
    "userId": 3,
    "recommendationDate": "2025-06-01",
    "recommendationStatus": "approved",
    "processDate": "2025-06-03",
    "fileCode": "REC-2025-001",
    "recommendationType": "promotion"
  }
}
```

Body Response error:

```json
{
  "errors": "Unauthorized"
}
```

## Update recommendations API

Endpoint: PUT /api/recommendations/:id

Headers:

- Authorization: token

Body Request:

```json
{
  "employeeId": 10,
  "userId": 3,
  "recommendationDate": "2025-06-01",
  "recommendationStatus": "approved",
  "processDate": "2025-06-03",
  "fileCode": "REC-2025-001",
  "recommendationType": "gaji"
}
```

Body Response Success:

```json
{
  "message": "Recommendation updated successfully.",
  "data": {
    "id": 1,
    "employeeId": 10,
    "userId": 3,
    "recommendationDate": "2025-06-01",
    "recommendationStatus": "approved",
    "processDate": "2025-06-03",
    "fileCode": "REC-2025-001",
    "recommendationType": "promotion"
  }
}
```

Body Response error:

```json
{
  "errors": "Record not found for update"
}
```

## Search recommendations API

Endpoint: GET /api/recommendations

Headers:

- Authorization: token

Query params :

- recommendationType: Search by recommendation type, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Body Response Success:

```json
{
  "data": [
    {
      "id": 1,
      "employeeId": 10,
      "userId": 3,
      "recommendationDate": "2025-06-01",
      "recommendationStatus": "approved",
      "processDate": "2025-06-03",
      "fileCode": "REC-2025-001",
      "recommendationType": "gaji"
    },
    {
      "id": 2,
      "employeeId": 8,
      "userId": 3,
      "recommendationDate": "2025-06-01",
      "recommendationStatus": "approved",
      "processDate": "2025-06-03",
      "fileCode": "REC-2025-001",
      "recommendationType": "pangkat"
    }
  ],

  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

## Delete recommendations API

Endpoint: Delete /api/recommendations/:id

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
