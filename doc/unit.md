# Unit API specification

## Create Unit API

Endpoint: POST /api/unit

Headers:

- Authorization: token

Body Request:

```json
{
  "unitName": "Subang"
}
```

Body Response Success:

```json
{
  "data": {
    "unitName": "Subang"
  }
}
```

Body Response error:

```json
{
  "errors": "Unit Name can't be empty"
}
```

## Get All Unit API

Endpoint: GET /api/unit

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": [
    {
      "unitName": "Subang"
    },
    {
      "unithName": "Kalijati"
    },
    {
      "unitName": "Ciasem"
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

## Get Single Unit API

Endpoint: GET /api/unit/:id

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": {
    "id": "1",
    "unitName": "Subang"
  }
}
```

Body Response error:

```json
{
  "errors": "Unauthorized"
}
```

## Update Unit API

Endpoint: PUT /api/unit/:id

Headers:

- Authorization: token

Body Request:

```json
{
  "unitName": "Subang"
}
```

Body Response Success:

```json
{
  "data": {
    "id": "1",
    "unitName": "Subang"
  }
}
```

Body Response error:

```json
{
  "errors": "Unit Name can't be empty"
}
```

## Search Unit API

Endpoint: GET /api/unit

Headers:

- Authorization: token

Query params :

- unitName : Search by unitName, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Body Response Success:

```json
{
  "data": [
    {
      "id": 1,
      "unitName": "Subang"
    },
    {
      "id": 2,
      "unitName": "Kalijati"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

## Delete Unit API

Endpoint: Delete /api/unit/:id

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
  "errors": "unit is not found"
}
```
