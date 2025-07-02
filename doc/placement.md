# Placement API specification

## Create Placement API

Endpoint: POST /api/placement

Headers:

- Authorization: token

Body Request:

```json
{
  "employeeId": 5,
  "branchId": 2,
  "unitId": 3,
  "divisionId": 1,
  "placementType": "pusat",
  "startDate": "2025-07-01"
}
```

Body Response Success:

```json
{
  "data": {
    "placement_id": 15,
    "employeeId": 5,
    "branchId": 2,
    "unitId": 3,
    "divisionId": 1,
    "placementType": "pusat",
    "startDate": "2025-07-01"
  }
}
```

Body Response error:

```json
{
  "errors": "placement type can't be empty"
}
```

## Get All placement API

Endpoint: GET /api/placement

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": [
    {
      "placement_id": 15,
      "employee": {
        "id": 5,
        "name": "John Doe"
      },
      "branch": {
        "id": 2,
        "name": "Headquarters"
      },
      "unit": {
        "id": 3,
        "name": "IT Support"
      },
      "division": {
        "id": 1,
        "name": "Technology"
      },
      "placement_type": "pusat",
      "start_date": "2025-07-01"
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

## Get Single placement API

Endpoint: GET /api/placement/:id

Headers:

- Authorization: token

Body Response Success:

```json
{
  "data": {
    "placement_id": 15,
    "employee": {
      "id": 5,
      "name": "John Doe"
    },
    "branch": {
      "id": 2,
      "name": "Headquarters"
    },
    "unit": {
      "id": 3,
      "name": "IT Support"
    },
    "division": {
      "id": 1,
      "name": "Technology"
    },
    "placement_type": "pusat",
    "start_date": "2025-07-01"
  }
}
```

Body Response error:

```json
{
  "errors": "Unauthorized"
}
```

## Update placement API

Endpoint: PUT /api/placement/:id

Headers:

- Authorization: token

Body Request:

```json
{
  "employeeId": 5,
  "branchId": 2,
  "unitId": 3,
  "divisionId": 1,
  "placementType": "pusat",
  "startDate": "2025-07-01"
}
```

Body Response Success:

```json
{
  "data": {
    "placement_id": 15,
    "employee": {
      "id": 5,
      "name": "John Doe"
    },
    "branch": {
      "id": 2,
      "name": "Headquarters"
    },
    "unit": {
      "id": 3,
      "name": "IT Support"
    },
    "division": {
      "id": 1,
      "name": "Technology"
    },
    "placement_type": "pusat",
    "start_date": "2025-07-01"
  }
}
```

Body Response error:

```json
{
  "errors": "placement Name can't be empty"
}
```

## Search placement API

Endpoint: GET /api/placement

Headers:

- Authorization: token

Query params :

- employee : Search by employee, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Body Request:

```json
{
  "data": [
    {
      "placement_id": 15,
      "employee": {
        "id": 5,
        "name": "John Doe"
      },
      "branch": {
        "id": 2,
        "name": "Headquarters"
      },
      "unit": {
        "id": 3,
        "name": "IT Support"
      },
      "division": {
        "id": 1,
        "name": "Technology"
      },
      "placement_type": "pusat",
      "start_date": "2025-07-01"
    },
    {
      "placement_id": 16,
      "employee": {
        "id": 6,
        "name": "Jane Smith"
      },
      "branch": {
        "id": 2,
        "name": "Headquarters"
      },
      "unit": {
        "id": 3,
        "name": "IT Support"
      },
      "division": {
        "id": 1,
        "name": "Technology"
      },
      "placement_type": "pusat",
      "start_date": "2025-07-01"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

## Delete placement API

Endpoint: Delete /api/placement/:id

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
  "errors": "placement is not found"
}
```
