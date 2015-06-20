#POST /reactions

The POST reactions endpoint will be used to create a new DRE reaction.

### Example Request Header
Here is an example header to insure the proper header values are being passed:

```
POST /api/reactions HTTP/1.1
Host: dre.540.co
Content-Type: application/json

<!-- For example request body see below -->
```

###Example Request Body
This is the payload that should be present in the request body for the `POST` request to `/reactions`.

```
{
  "reaction": "<reaction>",
}
```

### Example Successful Response
Below is a response to a `POST` to the `/reactions` API if non of the below error conditions has occured and everything is `200 OK`.

```
{
  "meta": {
    "last_updated": "",
    "execution_time": "0.004s",
    "total_count": 333
  },
  "data": {
    "reaction": "<reaction>",
    "translations": [
      {
        "definition": "<text>",
        "atribution_text": "<attribution_text>", 
        "source": "<source>",
        "votes": {
          "up": 1,
          "down": 4
         }
      }
      ...
    ]
  }
}
```


### Error Response

Below is a table showing the errors that will be returned on the endpoint if not 

|Status Code | Description |
|------------|-------------|
| 400        | `reaction` attribute not found... required |
| 400        | Any other root attributes other than `reaction`


For more information on the format of the error responses please see the [API Error Response Page](./errors.md).
