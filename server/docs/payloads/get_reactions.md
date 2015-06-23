#GET /reactions

The GET reactions endpoint will be used to retrieve a list of DRE reactions.

### Example Request Header
Here is an example header to insure the proper header values are being passed:

```
GET /api/reactions HTTP/1.1
Host: dre.540.co
```

### URL Parameters

Below is a list URL parameters that may/must be passed to a request to this list resource

| Parameter | Required? | Type |  Description |
|-----------|-----------|------|--------------|
| limit     | No        |`?` Query  | This field limits the number of responses to the supplied number |
| offset    | No        | `?` Query | This field skips to the position in the list that was passed (starting with 0) |

### Example Successful Response
Below is a response to a `GET` to the `/reactions` API if none of the below error conditions has occurred and everything is `200 OK`.

```
{
  "meta": {
    "execution_time": "0.004s",
    "limit": 25,
    "offset": 0,
    "total_count": 333
  },
  "data": [
    {
      "reaction": "<reaction>",
      "definitions": [
        {
          "definition": "<text>",
          "source": "<source>",
          "created_at": "yyyy-mm-dd hh:mm:ss",
          "created_by": "dre-app",
          "votes": {
            "up": 1,
            "down": 4
           }
        }
        ...
      ],
      "created_at": "yyyy-mm-dd hh:mm:ss",
      "created_by": "dre-harvester"
    }
    ...
  ]
}
```


### Error Response

Below is a table showing the errors that could be returned on the endpoint.

|Status Code | Description |
|------------|-------------|
| 400        | Anything other than `application/json` is requested in the `Accept` header |


For more information on the format of the error responses please see the [API Error Response Page](./errors.md).

---

#GET /reactions/:reaction

The GET reactions endpoint will be used to retrieve a list of DRE reactions.

### Example Request Header
Here is an example header to insure the proper header values are being passed:

```
GET /api/reactions HTTP/1.1
Host: dre.540.co
```

### URL Parameters

Below is a list URL parameters that may/must be passed to a request to this list resource

| Parameter | Required? | Type |  Description |
|-----------|-----------|------|--------------|
| reaction  | Yes       | URL Path | This field is a URL Encoded string of the medical reaction that is being fetched |

### Example Successful Response
Below is a response to a `GET` to the `/reactions/:reaction` API if none of the below error conditions have occurred and everything is `200 OK`.

```
{
  "meta": {
    "execution_time": "0.004s",
    "total_count": 333
  },
  "data": {
    "reaction": "<reaction>",
    "definitions": [
      {
        "definition": "<text>",
        "source": "<source>",
        "created_at": "yyyy-mm-dd hh:mm:ss",
        "created_by": "dre-app",
        "votes": {
          "up": 1,
          "down": 4
         }
      }
      ...
    ],
    "created_at": "yyyy-mm-dd hh:mm:ss",
    "created_by": "dre-harvester"
  }
}
```


### Error Response

Below is a table showing the errors that could be returned on the endpoint. 

|Status Code | Description |
|------------|-------------|
| 400        | Anything other than `application/json` is requested in the `Accept` header |
| 404        | The reaction term being fetched could not be found. |


For more information on the format of the error responses please see the [API Error Response Page](./errors.md).

