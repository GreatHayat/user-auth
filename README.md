# user-auth
A simple nodejs user authentication application to learn deployment on digital ocean.

## Start Application With Docker
`Make sure, you have installed docker and docker compose in your machine`

- clone the repository
- `docker-compose build`
- `docker-compose up -d` (-d is an optional flag)


## Start Application Without Docker

- clone the repository
- `cd user-auth/`
- `npm install`
- `npm run dev`

`Edit the mongodb connection in /src/index.js before running above commands.`


### Todo
- Volume is not added yet in the Docker Compose file for Mongodb.
