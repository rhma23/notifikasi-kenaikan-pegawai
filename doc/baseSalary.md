# Base Salaries API specification

## Create Base Salaries API

Endpoint: POST /api/base-salaries

Headers:

- Authorization: token

Body Request:

```json
{
  "amount": 5000000,
  "type": "III/a",
  "years_of_service": 2
}
```

Body Response Success:

```json
{
  "data": {
    "baseSalaryId": 1,
    "amount": 5000000,
    "type": "III/a",
    "years_of_service": 2
  }
}
```

Body Response error:

```json
{
  "errors": "Field 'amount' must be a valid number"
}
```

## Get All Base Salaries API

Endpoint: GET /api/base-salaries

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": [
    {
      "baseSalaryId": 1,
      "amount": 5000000,
      "type": "III/a",
      "yearsOfService": 2
    },
    {
      "baseSalaryId": 2,
      "amount": 5500000,
      "type": "III/b",
      "yearsOfService": 3
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

## Get Single Base Salary API

Endpoint: GET /api/base-salaries/:id

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": {
    "baseSalaryId": 1,
    "amount": 5000000,
    "type": "III/a",
    "yearsOfService": 2
  }
}
```

Body Response error:

```json
{
  "errors": "Unauthorized"
}
```

## Update Base Salary API

Endpoint: PUT /api/base-salaries/:id

Headers:

- Authorization: token

Body Request:

```json
{
  "amount": 6000000,
  "type": "III/c",
  "yearsOfService": 4
}
```

Body Response Success:

```json
{
  "data": {
    "baseSalaryId": 1,
    "amount": 6000000,
    "type": "III/c",
    "yearsOfService": 4
  }
}
```

Body Response error:

```json
{
  "errors": "Base Salary data not found"
}
```

## Search Base Salary API

Endpoint: GET /api/base-salaries

Headers:

- Authorization: token

Query params :

- type : Search by type, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Body Response Success:

```json
{
  "data": [
    {
      "baseSalaryId": 1,
      "amount": 5000000,
      "type": "III/a",
      "yearsOfService": 2
    },
    {
      "baseSalaryId": 2,
      "amount": 5500000,
      "type": "III/b",
      "yearsOfService": 3
    }
  ],

  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

## Delete Base Salary API

Endpoint: Delete /api/base-salaries/:id

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
  "errors": "Base Salary data not found"
}
```
