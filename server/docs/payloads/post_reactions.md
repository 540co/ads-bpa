#POST /reactions

The POST reactions endpoint will be used to create a new DRE reaction.


###Request Errors
|Status Code | Description |
|------------|-------------|
| 400        | Reaction attribute not found... required |
| 400        | translation.votes[] array included in the request body... not allowed |
| 400        | Any other root attributes other than "reaction" and "translation"... not allowed
| 400        | Any "translation" nodes with attributes other than the ones mentioned in this example payload... not allowed.
| 400        | Any translation nodes that do not have the required fields of "definition" or "source" (required)... "attribution_text" is optional |


###Example Request
```
{
  "reaction": "<reaction>",
  "translation":[
    {
      "definition": "<text>",
      "atribution_text": "<attribution_text>",
      "source": "<source>",
    }
  ]
}
```
