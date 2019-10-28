# Interview-code-challenge backend

A simple REST Api for [GuideSmiths](https://www.guidesmiths.com/) Interview Challenge. It has been developed with [Nodejs](https://nodejs.org), relying on [Express](https://expressjs.com) middleware and [MongoDB](https://www.mongodb.com) for the persistence layer.

This App is packed using [Docker](https://www.docker.com/) container , including the following files:
- A docker-compose file to set up a MongoDB service on its own. You can run the provided tests and server locally.
- A Dockerfile to create the App image.
- A docker-compose file to run the above App image along with a MongoDB service.

You can run these options as [npm scripts](https://docs.npmjs.com/misc/scripts). Please, refer to the [Usage]() section to further instructions.

Please, note that the first docker-compose is thought to run tests. Should you want to build a production like environment, building the App image and then running the second docker-compose file would be a better approach.

# Usage
## Tests
As mention above, you must previously set up the docker-compose file with MongoDB service as follow:

```
 $ npm run mongodb:up
```
which will execute `docker-compose -f docker-compose.mongo.yml up -d`, being `docker-compose.mongo.yml` the file for the MongoDB service on its own. Then, you are ready to run the provided tests:
```
$ npm test
```
which executes `DEV=1 mocha src/__tests__`. `DEV` flag indicates using development environment variables.

You can also run the App locally:
```
$ npm start
```
executing `DEV=1 node src/index.js`, although a second docker-compose file is provided to run the server along with MongoDB.

To stop the MongoDB service execute:
```
$ npm run mongodb:down
```

## Production like environment


> :warning: Make sure you stopped MongoDB container before executing the following commands


To simulate a production environment you must run:
```
$ npm run build
```
which will execute `docker build -t neodmy/backend .` building the server image with `neodmy/backend` tag. Then you can set up the containers with:

```
$ npm run server:up
```
executing `docker-compose up`, which creates a container for the App named `neodmy-backend` and the MongoDB container named`mongodb`.

To stop both cointainers execute:
```
$ npm run server:down
```
which will execute

## Server endpoints

As suggested by the instructions provided, the REST APÎ deals with *phones* in JSON format, i.e.
```JSON
{
"name": "phone name",
"manufacturer": "manufacturer name",
"description": "a brief description",
"color": "phone color",
"price": 0,
"imageFileName": "path to the static image file",
"screen": "screen size and technology",
"processor": "processor name",
"ram": 0
}
```
When inserted in MongoDB, further requests on the above JSON will include the additional property
```JSON
{
"_id": "5db734e189062a06c0b84c03" (MongoDB Id)
}
```
The App enables to carry out CRUD operations through the following endpoints:

> :grey_exclamation: Server Timeout is set to 5000ms overriding default value, preventing an excessive waiting

- Fetch all phones:
	- URL `/phones`
	- Method: `GET`
	- Response: 
		- Code: `200 OK`
		- Content: *phones* JSON Array
 - Fetch a phone:
	- URL `/phones/:id`
	- Method: `GET`
	- URL Param: `id` of the phone
	- Response:
		- Code: `200 OK`
		- Content: *phone* JSON
- Add a new phone:
	- URL: `/phones/
	- Method: `POST`
	- Data Params: *phone* JSON
	- Response:
		- Code: `201 Created`
		- Content: *phone* JSON with recent assigned `id` as `_id` property
- Populate DB with provided data:
	- URL `/phones/populate`
	- Method: `POST`
	- Response:
		- Code: `201 Created`
		- Content: *phone* JSON Array with recent assigned `id` as `_id` property
- Modify existing phone:
	- URL: `/phones/:id`
	- Method: `PUT`
	- Data Params: `phone` JSON with new property values
	- Response: `
		- Code: `200 OK`
		- Content: `phone` JSON with updated properties
- Delete all phones:
	- URL: `/phones/`
	- Method: `DELETE`
	- Response:
		- Code: `204 No Content`
- Delete phone:
	- URL: `/phones/:id`
	- Method: `DELETE`
	- Response:
		- Code: `204 No Content`
