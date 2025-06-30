# Branch API specification

## Create Branch API

Endpoint: POST /api/branch/create

Headers:

- Authorization: token

Body Request:

```json
{
  "branchName": "Subang"
}
```

Body Response Success:

```json
{
  "data": {
    "branchName": "Subang"
  }
}
```

Body Response error:

```json
{
  "errors": "Branch Name can't be empty"
}
```

## Get All Branch API

Endpoint: GET /api/branch

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": [
    {
      "branchName": "Subang"
    },
    {
      "branchName": "Kalijati"
    },
    {
      "branchName": "Ciasem"
    }
  ]
}
```

Body Response error:

```json
{
  "errors": "Unautorize"
}
```

## Get Single Branch API

Endpoint: GET /api/branch/:id

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": {
    "id": "1",
    "branchName": "Subang"
  }
}
```

Body Response error:

```json
{
  "errors": "Unautorize"
}
```

## Update Branch API

Endpoint: PUT /api/branch/:id

Headers:

- Authorization: token

Body Request:

```json
{
  "branchName": "Subang"
}
```

Body Response Success:

```json
{
  "data": {
    "id": "1",
    "branchName": "Subang"
  }
}
```

Body Response error:

```json
{
  "errors": "branchName can't be empty"
}
```

## Search Branch API

Endpoint: GET /api/branch

Headers:

- Authorization: token

Query params :

- branchName : Search by branchName, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Body Request:

```json
{
  "data": [
    {
      "id": 1,
      "branchName": "Subang"
    },
    {
      "id": 2,
      "branchName": "Kalijati"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

## Delete Branch API

Endpoint: Delete /api/branch/:id

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
  "errors": "contact is not found"
}
```
