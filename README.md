# Superheroes App back

---

- The Service when you can find superheroes or create you own superhero.

- The Server runs on https://superheroes-api-evnc.onrender.com

- The Project is base on Node.js, Express and MongoDB.

- To run the project locally, follow these steps:

1. Clone the repository;
2. Install the dependencies: `npm install`
3. Run the following command: `npm run start:dev`

<div align="center">

### Superhero Endpoints

| HTTP Method | Endpoint          | Description                     |
| ----------- | ----------------- | ------------------------------- |
| GET         | `/heroes/`        | Get all Superheroes             |
| GET         | `/heroes/:heroId` | Get Superhero by id             |
| POST        | `/heroes/`        | Add information about Superhero |
| PATCH       | `/heroes/:heroId` | Update Superhero by id          |
| DELETE      | `/heroes/:heroId` | Delete Superhero by id          |
| POST        | `/heroes/photo`   | Upload Superhero`s photo        |
