# Family Data API specification

## Create Family Data API

Endpoint: POST /api/family-datas

Headers:

- Authorization: token

Body Request:

```json
{
  "employeeId": 12,
  "nik": "1234567890123456",
  "fullName": "Michael Johnson",
  "placeOfBirth": "Jakarta",
  "dateOfBirth": "1992-04-01",
  "gender": "M",
  "marriageDate": "2020-01-01",
  "familyStatus": "child"
}
```

Body Response Success:

```json
{
  "message": "Family member added successfully.",
  "data": {
    "id": 1,
    "employeeId": 12,
    "nik": "1234567890123456",
    "fullName": "Michael Johnson",
    "placeOfBirth": "Jakarta",
    "dateOfBirth": "1992-04-01",
    "gender": "M",
    "marriageDate": "2020-01-01",
    "familyStatus": "child"
  }
}
```

Body Response error:

```json
{
  "errors": "Field 'promotion' must be valid string"
}
```

## Get All family-datas API

Endpoint: GET /api/family-datas

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": [
    {
      "id": 1,
      "employeeId": 12,
      "nik": "1234567890123456",
      "fullName": "Michael Johnson",
      "placeOfBirth": "Jakarta",
      "dateOfBirth": "1992-04-01",
      "gender": "M",
      "marriageDate": "2020-01-01",
      "familyStatus": "child"
    },
    {
      "id": 2,
      "employeeId": 12,
      "nik": "1234567890123457",
      "fullName": "Sarah Johnson",
      "placeOfBirth": "Jakarta",
      "dateOfBirth": "1995-05-15",
      "gender": "F",
      "marriageDate": "2020-01-01",
      "familyStatus": "child"
    }
  ]
}
```

Body Response error:

```json
{
  "errors": "Unauthorized "
}
```

## Get Single family-datas API

Endpoint: GET /api/family-datas/:id

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": {
    "id": 1,
    "employeeId": 12,
    "nik": "1234567890123456",
    "fullName": "Michael Johnson",
    "placeOfBirth": "Jakarta",
    "dateOfBirth": "1992-04-01",
    "gender": "M",
    "marriageDate": "2020-01-01",
    "familyStatus": "child"
  }
}
```

Body Response error:

```json
{
  "errors": "Unauthorized"
}
```

## Update family-datas API

Endpoint: PUT /api/family-datas/:id

Headers:

- Authorization: token

Body Request:

```json
{
  "employeeId": 12,
  "nik": "1234567890123456",
  "fullName": "Michael Johnson",
  "placeOfBirth": "Jakarta",
  "dateOfBirth": "1992-04-01",
  "gender": "M",
  "marriageDate": "2020-01-01",
  "familyStatus": "child"
}
```

Body Response Success:

```json
{
  "message": "Family member added successfully.",
  "data": {
    "id": 1,
    "employeeId": 12,
    "nik": "1234567890123456",
    "fullName": "Michael Johnson",
    "placeOfBirth": "Jakarta",
    "dateOfBirth": "1992-04-01",
    "gender": "M",
    "marriageDate": "2020-01-01",
    "familyStatus": "child"
  }
}
```

Body Response error:

```json
{
  "errors": "Record not found for update"
}
```

## Search family-datas API

Endpoint: GET /api/family-datas

Headers:

- Authorization: token

Query params :

- family-dataType: Search by family-data type, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Body Response Success:

```json
{
  "data": [
    {
      "id": 1,
      "employeeId": 12,
      "nik": "1234567890123456",
      "fullName": "Michael Johnson",
      "placeOfBirth": "Jakarta",
      "dateOfBirth": "1992-04-01",
      "gender": "M",
      "marriageDate": "2020-01-01",
      "familyStatus": "child"
    },
    {
      "id": 2,
      "employeeId": 12,
      "nik": "1234567890123457",
      "fullName": "Sarah Johnson",
      "placeOfBirth": "Jakarta",
      "dateOfBirth": "1992-04-01",
      "gender": "F",
      "marriageDate": "2020-01-01",
      "familyStatus": "child"
    }
  ],

  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

## Delete family-datas API

Endpoint: Delete /api/family-datas/:id

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
