# Employee API specification

## Create Employee API

Endpoint: POST /api/employees

Headers:

- Authorization: token

Body Request:

```json
{
  "userID": 1,
  "educationID": 3,
  "rankID": 4,
  "positionID": 5,
  "name": "Jane Doe",
  "nipp": "19820901",
  "birthPlace": "Jakarta",
  "birthDate": "1982-09-01",
  "gender": "L",
  "kkNumber": "1234567890123456",
  "nik": "3210998877665544",
  "familyStatus": "married",
  "employmentStatus": "tetap",
  "address": "Jl. Merdeka No.1",
  "photo": "https://example.com/uploads/photo.jpg"
}
```

Body Response Success:

```json
{
  "data": {
    "employeeID": 1,
    "name": "Jane Doe",
    "gender": "L",
    "employmentStatus": "tetap"
  }
}
```

Body Response error:

```json
{
  "errors": "Employee Name can't be empty"
}
```

## Get All employees API

Endpoint: GET /api/employees

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": [
    {
      "employeeID": 1,
      "name": "Jane Doe",
      "position": "Manager",
      "rank": "III A",
      "education": {
        "level": "S1",
        "major": "Computer Science"
      },
      "gender": "L",
      "status": "tetap"
    },
    {
      "employeeID": 2,
      "name": "Lisa",
      "position": "Developer",
      "rank": "II B",
      "education": {
        "level": "S2",
        "major": "Information Technology"
      },
      "gender": "M",
      "status": "kontrak"
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

## Get Single employees API

Endpoint: GET /api/employees/:id

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": {
    "employeeID": 1,
    "user": {
      "username": "janedoe",
      "email": "jane@example.com"
    },
    "name": "Jane Doe",
    "nipp": "19820901",
    "birthPlace": "Jakarta",
    "birthDate": "1982-09-01",
    "gender": "F",
    "kkNumber": "1234567890123456",
    "nationalID": "3210998877665544",
    "familyStatus": "married",
    "employmentStatus": "permanent",
    "education": {
      "level": "Bachelor",
      "major": "Computer Science"
    },
    "position": {
      "id": 5,
      "name": "Manager"
    },
    "grade": {
      "id": 4,
      "gradeName": "Penata Muda",
      "gradeType": "III/a"
    },
    "address": "Jl. Merdeka No.1",
    "photo": "https://example.com/uploads/photo.jpg"
  }
}
```

Body Response error:

```json
{
  "errors": "Unauthorized"
}
```

## Update employees API

Endpoint: PUT /api/employees/:id

Headers:

- Authorization: token

Body Request:

```json
{
  "userID": 1,
  "educationID": 3,
  "rankID": 4,
  "positionID": 5,
  "name": "Jane Doe",
  "nipp": "19820901",
  "birthPlace": "Jakarta",
  "birthDate": "1982-09-01",
  "gender": "L",
  "kkNumber": "1234567890123456",
  "nik": "3210998877665544",
  "familyStatus": "married",
  "employmentStatus": "tetap",
  "address": "Jl. Merdeka No.1",
  "photo": "https://example.com/uploads/photo.jpg"
}
```

Body Response Success:

```json
{
  "data": {
    "userID": 1,
    "educationID": 3,
    "rankID": 4,
    "positionID": 5,
    "name": "Jane Doe",
    "nipp": "19820901",
    "birthPlace": "Subang",
    "birthDate": "1982-09-01",
    "gender": "L",
    "kkNumber": "1234567890123456",
    "nik": "3210998877665544",
    "familyStatus": "married",
    "employmentStatus": "tetap",
    "address": "Jl. Merdeka No.1",
    "photo": "https://example.com/uploads/photo.jpg"
  }
}
```

Body Response error:

```json
{
  "errors": "Employee Name can't be empty"
}
```

## Search employees API

Endpoint: GET /api/employees

Headers:

- Authorization: token

Query params :

- employeesName : Search by employeesName, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Body Response Success:

```json
{
  "data": [
    {
      "employeeID": 1,
      "user": {
        "username": "janedoe",
        "email": "jane@example.com"
      },
      "name": "Jane Doe",
      "nipp": "19820901",
      "birthPlace": "Jakarta",
      "birthDate": "1982-09-01",
      "gender": "F",
      "kkNumber": "1234567890123456",
      "nationalID": "3210998877665544",
      "familyStatus": "married",
      "employmentStatus": "permanent",
      "education": {
        "level": "Bachelor",
        "major": "Computer Science"
      },
      "position": {
        "id": 5,
        "name": "Manager"
      },
      "grade": {
        "id": 4,
        "gradeName": "Penata Muda",
        "gradeType": "III/a"
      },
      "address": "Jl. Merdeka No.1",
      "photo": "https://example.com/uploads/photo.jpg"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

## Delete employees API

Endpoint: Delete /api/employees/:id

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
  "errors": "Employee data not found"
}
```
