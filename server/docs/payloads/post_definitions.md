#POST /reactions/:reaction/definitions

The POST definitions endpoint will be used to create a new definition on an existing DRE reaction.

### Example Request Header
Here is an example header to insure the proper header values are being passed:

```
POST /api/reactions/death/definitions HTTP/1.1
Host: dre.540.co
Content-Type: application/json

<!-- For example request body see below -->
```

### URL Parameters

Below is a list URL parameters that may/must be passed to a request to this list resource

| Parameter | Required? | Type |  Description |
|-----------|-----------|------|--------------|
| reaction  | Yes       | URL Path | This field is a URL Encoded string of the medical reaction that is being fetched |

###Example Request Body
This is the payload that should be present in the request body for the `POST` request to `/reactions/:reaction/definitions`.

```
{
  "definition": "<definition>",
}
```

### Example Successful Response
Below is a response to a `POST` to the `/reactions/:reaction/definitions` API if none of the below error conditions has occurred and everything is `200 OK`.

```
{
  // This is the same response as /reactions/:reaction
}
```


### Error Response

Below is a table showing the errors that could be returned on the endpoint.

|Status Code | Description |
|------------|-------------|
| 400        | `definition` attribute not found... required |
| 400        | Any other root attributes other than `definition`|
| 400        | Any request `Content-Type` other than `application/json` |
| 400        | `definition` node being anything other than a String node |
| 422        | Duplicate `definition` (one that already exists in the database) |


For more information on the format of the error responses please see the [API Error Response Page](./errors.md).
