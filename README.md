
<h1 align="center">
  👾A simulation of Simon Game🕹
</h1>
<p align="center"> Try it out by cloning this repo and run index.html file from your local machine! </p>
<h2> Demo pictures: </h2>
<div align="center">
  <img alt="Demo Image 1" src="https://drive.google.com/uc?export=view&id=1XhkW_rVwrIktugFG_DbRqp9pDLJrggBd" width="1000">
  <img alt="Demo Image 2" src="https://drive.google.com/uc?export=view&id=1-M5aSZGwT1SVY2mi8qavvqksoZ8aoE8i" width="1000">
</div>

# team4-advocacy
**Please branch off the dev branch!!**
GraphQL Endpoint for `master`/production: https://empowering-social-advocacy.herokuapp.com/v1/graphql
* Public website (based on `master` branch): https://social-advocacy.netlify.app/
Authentication will be added later.
## Setting Up 
You will have to set up **Docker, Hasura, Node and React**.
1. Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
2. Configure and connect your Docker container to Hasura console: https://hasura.io/docs/1.0/graphql/manual/getting-started/docker-simple.html#docker-simple
   * Note you may need to use `sudo`
   * Note for prerequisites Windows users can use docker desktop to combine docker compose and docker
3. Set up Hasura database migrations: https://hasura.io/docs/1.0/graphql/manual/migrations/config-v1/manage-migrations.html#manage-migrations-v1 (use notes for this section as some of the steps are not needed)
   * **IMPORTANT:** This is in the instructions, but you should set `HASURA_GRAPHQL_ENABLE_CONSOLE: "false"` in your Docker YAML.
   * Note for step 2, we already have a hasura folder in the repo, so just run `cd hasura`
   * then run `hasura hasura --endpoint http://localhost:8080/`
   * Note for step 3 because we provide you with a migrations folder and files instead you should run `hasura migrate apply` and `hasura metadata apply` (once completed make sure all relationships are tracked and that profile table has the identity bubles relationship name changed to bubbles) 
   * You can see what migrations are present in the folder but not in the database with `hasura migrate status` 
   * From this point on you need to run hasura console to look at the database, and make changes so that the migration files will be created (see DBA before commiting any changes)
   * Step 5 and beyond are not necessary at this time
4. Set up Node: `cd nodejs-express && npm install`
5. Set up React: `cd .. && npm install`
## Starting up Your Environment
All relative to project root directory
* Start Docker: `docker-compose up -d`
  * Usually this is always running after running `docker-compose up -d` in Step 2
  * You can check by running `docker ps` or `sudo docker ps`. Look for a process running on port 8080. 
* Start Hasura in another terminal: `cd hasura && hasura console`
  * Should be on port 9695
  * Again, **only develop in this Hasura console, not port 8080**
* Start Node in another terminal: `cd nodejs-express && npm start`
  * Should be on port 3001
* Start React in another terminal: `npm start`
  * Should be on port 3000 
## Tech Stack
There are three components to our stack: front-end, GraphQL and business logic.
* Front-end is run on **React**
* GraphQL is run on **Hasura**. In order to develop a local Hasura environment, you must have a **Docker** container running GraphQL Engine locally. 
  * Docker will help us develop in our own localized Hasura environment, no need to access a Heroku endpoint.
  * We will use Hasura only for CRUD actions in GraphQL. No database or backend server needed!
* Our business logic is run on a **Node-Express** server. This server will run Hasura Actions. Any CRUD operations associated with our Actions' business logic will also be triggered within this server.
  * For some functionalities, just having access to CRUD is not enough. Some examples being:
    * Emailing a person who just signed up on our platform
    * User authentication - check that their username and password is valid
  * Hasura Actions give us the opportunity to execute business logic alongside any Hasura CRUD operations.
  * Business logic will be handled in this Node server
  
  
  
GraphQL Endpoint for `dev`: https://social-advocacy.herokuapp.com/v1/graphql
* Dev website (based on `dev` branch): https://social-advocacy-dev.netlify.app/

