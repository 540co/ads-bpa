# Error Payloads

Generic payload response bodies will be returned to portray any errors with the request or on the server processing the API request.  Below is a table of elements that may be returned on error.


| Attribute | Description |
|-----------|-------------|
| error     | A brief error message describing the nature of the error. |
| message   | A more descriptive message that gives insight into why the error may have occurred. |
| request_body | `DEBUG` This field echos the request body for any request that has a JSON payload.  This is only returned in the development environment.  `app['env'] == 'development'` 

### Example Request Body

This is the payload that will be returned on an error including any `4xx` or `5xx` status code.  The sample payload below is an example of a payload that does not contain a JSON payload or was executed in the `production` environment.

```
{
    "error": "<error>",
    "message": "<message>"
}
```

In the `development` environment`, the following payload would be returned if a JSON payload existed:

```
{
    "error": "<error>",
    "message": "<message>",
    "request_body": {
    	<json_request_payload>
    }
}
```


