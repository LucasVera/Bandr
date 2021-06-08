# Bandr
#### Music bands from around the globe!
This project was generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/). It's an API that let's you register as a user, sign-in, do a CRUD of bands and like a public band.

##### Some features are:
- Users are only allowed to do operations if they are signed-in
- Users are not allowed to modify data from other people's bands
- Users are not allowed to delete public bands
- Users can retrieve a list of all their liked public bands
- GET requests support pagination in the form of path parameters `limit` and `page`.

#### Some tech that was used:
- Node.js
- Typescript
- Serverless
- middy
- Jest
- eslint
- Firebase
- MongoDB

#### How to run locally

##### Requirements

> NodeJS
> Git
> (optional) Postman

##### Steps
1. Clone the project in your machine
2. Open a console at the root of the project
3. type `npm install` and hit enter
4. after it finishes installing, type `npm start` and hit enter
5. After a while, available endpoints should appear in the console

**IMPORTANT**: for the project to run successfully in your local machine, you have to create a file in the root directory called `.env`. In the project there's an example of all the information that it should have (`env.example`). Please ask for the configuration or else it won't work properly.

This project uses jest to run some unit tests. To run them, simply type `npm test` in a console a the root of the project and hit enter.

#### Postman collection
This project ships with a postman collection to make it easier to test the application. Please, import the collection from postman and execute the available endpoints

> The sign-in endpoint automatically saves the `JWT` and `userId` to use in subsequent calls, so you don't need to manually fill them out in other requests
