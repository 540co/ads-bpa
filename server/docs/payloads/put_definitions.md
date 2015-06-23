#PUT /reactions/:reaction/definitions/:index

The PUT definitions endpoint will be used to vote on a definition for an existing DRE reaction.

### Example Request Header
Here is an example header to insure the proper header values are being passed:

```
PUT /api/reactions/death/definitions/0 HTTP/1.1
Host: dre.540.co
Content-Type: application/json

<!-- For example request body see below -->
```

### URL Parameters

Below is a list of URL parameters that may/must be passed to a request to this list resource

| Parameter | Required? | Type |  Description |
|-----------|-----------|------|--------------|
| reaction  | Yes        | URL Path | This field is a URL Encoded string of the medical reaction that is being fetched |
| index     | Yes        | URL Path | This field is the index of the definitions list within the specified reaction (numerical) |


###Example Request Body
This is the payload that should be present in the request body for the `PUT` request to `/reactions/:reaction/definitions/:index`.  The only allowable values for the `vote` key in the request body is `up` or `down`.

```
{
  "vote": "<up|down>",
}
```

### Example Successful Response
Below is a response to a `PUT` to the `/reactions/:reaction/definitions` API if none of the below error conditions has occurred and everything is `200 OK`.

```
{
  // This is the same response as /reactions/:reaction
}
```


### Error Response

Below is a table showing the errors that could be returned on the endpoint.

|Status Code | Description |
|------------|-------------|
| 400        | `vote` attribute not found... required |
| 400        | Any other root attributes other than `vote`|
| 400        | Any request `Content-Type` other than `application/json` |
| 400        | `vote` node being anything other than a String node and containing any other value other than "up" or "down" |
| 404        | A vote request is made to a definition `index` that did not exist |


For more information on the format of the error responses please see the [API Error Response Page](./errors.md).
