#GET /searches

The GET searches endpoint will be used to retrieve a list of DRE searches that are ordered (by default) from the highest to the lowest count.

### Example Request Header
Here is an example header to insure the proper header values are being passed:

```
GET /api/searches HTTP/1.1
Host: dre.540.co
```

### URL Parameters

Below is a list of URL parameters that may/must be passed to a request to this list resource

| Parameter | Required? | Type |  Description |
|-----------|-----------|------|--------------|
| limit     | No        |`?` Query  | This field limits the number of responses to the supplied number |
| offset    | No        | `?` Query | This field skips to the position in the list that was passed (starting with 0) |

### Example Successful Response
Below is a response to a `GET` to the `/searches` API if none of the below error conditions has occurred and everything is `200 OK`.

```
{
  "meta": {
    "limit": 25,
    "offset": 0,
    "total_count": 16,
    "execution_time": "0.061s"
  },
  "data": [
    {
      "search": "ibuprofen",
      "count": 98
    },
    {
      "search": "pain",
      "count": 35
    },
    {
      "search": "off label use",
      "count": 25
    },
    ...
   ]
}

```


### Error Response

Below is a table showing the errors that could be returned on the endpoint.

|Status Code | Description |
|------------|-------------|
| 400        | Anything other than `application/json` is requested in the `Accept` header |
| 404        | Invalid offset (will occur if offset is less than 0) |

For more information on the format of the error responses please see the [API Error Response Page](./errors.md).