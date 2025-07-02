# Position API specification

## Create Position API

Endpoint: POST /api/position

Headers:

- Authorization: token

Body Request:

```json
{
  "positionName": "Kepala Divisi"
}
```

Body Response Success:

```json
{
  "data": {
    "positionId": 1,
    "positionName": "Kepala Divisi"
  }
}
```

Body Response error:

```json
{
  "errors": "Field 'positionName' is required."
}
```

## Get All Position API

Endpoint: GET /api/position

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": [
    {
      "positionId": 1,
      "positionName": "Kepada Divisi"
    },
    {
      "positionId": 2,
      "positionName": "Kepala Tim"
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

## Get Single Position API

Endpoint: GET /api/position/:id

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": {
    "positionId": "1",
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

## Update Position API

Endpoint: PUT /api/position/:id

Headers:

- Authorization: token

Body Request:

```json
{
  "positionName": "Kepegawaian"
}
```

Body Response Success:

```json
{
  "data": {
    "positionId": "1",
    "level": "S1",
    "major": "Sistem Informasi"
  }
}
```

Body Response error:

```json
{
  "errors": "position data not found"
}
```

## Search Position API

Endpoint: GET /api/position

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
      "positionId": 1,
      "level": "S1",
      "major": "Sistem Informasi"
    },
    {
      "positionId": 2,
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

## Delete Position API

Endpoint: Delete /api/position/:id

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
  "errors": "position data not found"
}
```
