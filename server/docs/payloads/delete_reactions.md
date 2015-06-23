#DELETE /reactions/:reaction

The DELETE reactions endpoint will be used to delete a DRE reaction.

### Example Request Header
Here is an example header to insure the proper header values are being passed:

```
DELETE /api/reactions/death HTTP/1.1
Host: dre.540.co
```

### URL Parameters

Below is a list of URL parameters that may/must be passed to a request to this endpoint.

| Parameter | Required? | Type |  Description |
|-----------|-----------|------|--------------|
| reaction  | Yes       | URL Path | This field is a URL Encoded string of the medical reaction that is being deleted |

### Example Successful Response
Below is a response to a `DELETE` to the `/reactions/:reaction` API if none of the below error conditions has occurred and everything is `200 OK`.  The response payload is the structure of the reaction instance that was deleted.

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
| 404        | The reaction term being deleted could not be found. |


For more information on the format of the error responses please see the [API Error Response Page](./errors.md).