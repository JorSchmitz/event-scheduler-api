# Event Scheduler Rest API

- Javascript, Node.js, Express.js, PostgreSQL, Sequelize ORM, Passport, Jwt, Bcrypt.

- Authentication with Passport and JWT, implemented with MVC architectural pattern, security with BCrypt, autentications and authorizations, Scalable, with Migrations and Seeders, permissions verifications, filters and paginations for better responses.

- To run the project, install dependencies with "npm i", then configure the api on src/database/config/config.js, then create a .env for your environment variables, you may use the example.env as a guide. Finally run migrations with "npx sequelize-cli db:migrate", and optionally you may want to edit and run the seeders with "npx sequelize-cli db:seed:all".

# Endpoints

- https://event-scheduler-w973.onrender.com

- /api/v1/

POST /events: Create a new event. <br />
GET /events: Retrieve all events. <br />
GET /events/:id Retrieve a single event by its event_id. <br />
PUT /events/:id Update an existing event by its event_id. <br />
DELETE /events/:id Delete an existing event by its event_id. <br />

POST /auth/login <br />
POST /auth/sign-up
