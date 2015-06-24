#POST /searches

The POST searches endpoint will be used to log all of the searches done on reaction data.  If the search term entered has never been searched before, it will be added to the search collection with an initialized count of `1`.  If it has been searched before, the existing search count will be incremented by `1`.

### Example Request Header
Here is an example header to insure the proper header values are being passed:

```
POST /api/searches HTTP/1.1
Host: dre.540.co
Content-Type: application/json

<!-- For example request body see below -->
```

###Example Request Body
This is the payload that should be present in the request body for the `POST` request to `/searches`.

```
{
  "search": "<search>",
}
```

### Example Successful Response
Below is a response to a `POST` to the `/searches` API if none of the below error conditions has occurred and everything is `200 OK`.

```
{
  "meta": {
    "execution_time": "0.024s"
  },
  "data": {
    "search": "ibuprofen",
    "count": 21
  }
}
```


### Error Response

Below is a table showing the errors that could be returned on the endpoint.

|Status Code | Description |
|------------|-------------|
| 400        | `search` attribute not found... required |
| 400        | Any other root attributes other than `search`|
| 400        | Any request `Content-Type` other than `application/json` |
| 400        | `search` node being anything other than a String node |


For more information on the format of the error responses please see the [API Error Response Page](./errors.md).
