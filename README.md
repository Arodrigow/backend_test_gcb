# Doctor's API

An API to register and manage doctors, made as a techinical test.

Created using [NestJS](https://nestjs.com/), [PostgreSQL](https://www.postgresql.org/) and [Docker](https://www.docker.com/).

## How to run

To run the app:

```bash
$ yarn docker:up
```

To stop and delete containers:

```bash
$ yarn docker:down
```

To delete the app image:

```bash
$ yarn docker:del
```

## Documentation

With the program running, use the following route:

[http://localhost:3000/api/#/](http://localhost:3000/api/#/)

## Testing the app

The tests were divided suites, Unit and Integration.

To run the unit tests:

```bash
$ yarn test:unit
```

To run the integration tests:

```bash
$ yarn test:int
```
