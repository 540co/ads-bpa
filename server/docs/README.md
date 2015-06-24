#Documents

This directory houses any of the documentation that supports the development of the server side of DRE.

###Architecture

To see all of the architecture diagrams, please browse the table for the diagram that is of most interest:

| Diagram | Description |
|---------|-------------|
| [Architecture Diagram](./architecture/architecture_diagram.png) | This diagram shows the interoperability of components (internal and external) including the ports used for communication (also shown below) |

![Architecture Diagram](./architecture/architecture_diagram.png)


###List of API Endpoints

The DRE APIs harvest necessary data from OpenFDA and allow for orchestration with additional data sets.  The table below describes  each resource type available in the DRE APIs.

| Resource | Description | 
|----------|-------------|
| Reactions | Reactions related to medical reactions found in the adverse event reports endpoints from OpenFDA. |
| Definitions | Definitions are English readable descriptions of a medical reaction. |
| Searches | The search resource catalogues all of the search terms that are performed and can be used to track most used search terms. |

Please use the links below to navigate to the respective endpoint to learn more about its behavior:

- Reactions Endpoints
  - [GET /reactions](./payloads/get_reactions.md#get-reactions)
  - [POST /reactions](./payloads/post_reactions.md)
  - [GET /reactions/:reaction](./payloads/get_reactions.md#get-reactionsreaction)
  - [DELETE /reactions/:reaction](./payloads/delete_reactions.md)
  
- Definitions Endpoints
  - [POST /reactions/:reaction/definitions](./payloads/post_definitions.md)
  - [PUT /reactions/:reaction/definitions/:index](./payloads/put_definitions.md)
  

- Searches Endpoints
  - [GET /searches](./payloads/get_searches.md)
  - [POST /searches](./payloads/post_searches.md)