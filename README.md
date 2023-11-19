# Mindtech home assignment with [Docker][docker-desktop]

## Enviorment variables

First in the *app* fodler, create an *.env* file locally. You can duplicate *.env.example* and name the new copy *.env*. Adapt the variables to your needs.

## Run the project with docker

```sh
docker-compose up
```

## Docker build

```sh
docker-compose build
```


## Missing features

- Frontend and backend websocket communication
- Frontend: there is a function to add new itineraries, however, in the add and edit form, it's not possible to edit the route. As the route cannot be specified, when adding, the API throws an error. Therefore, a new element can only be added by making an API call outside the page, for example with *postman*

### Example for API calls

- GET localhost:5000/api/itineraries/ - get all documents
- GET localhost:5000/api/itineraries/:id - get a specific document
- POST localhost:5000/api/itineraries - create document
    body (json):
    {
        "title": "Budapest-Szeged",
        "description": "Test route 1",
        "route": ["Budapest", "Szeged"]
    }
- PUT localhost:5000/api/itineraries - edit document
    body (json):
    {
        "title": "Budapest-Szeged-Győr",
        "description": "Test route 2",
        "route": ["Budapest", "Szeged", "Győr]
    }
- DELETE localhost:5000/api/itineraries/:id - soft delete a document

[docker-desktop]: https://www.docker.com/