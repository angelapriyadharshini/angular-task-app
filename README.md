# AngularTaskApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.1.

## Clone and install modules

Clone this repository using the clone url, open the project in VSCode IDE. 
Run,

```bash
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running the Mock JSON Server
To up the backend JSON server, follow these steps,

Install JSON Server globally:
```bash
npm install -g json-server
```
    
Start JSON Server:
    Inside the project folder, 
```bash
json-server --watch db.json --port 3000
```

Now mock data will be available at http://localhost:3000/tasks
This command uses the db.json file available in the root directory of the project to up the server with mock data. Please use this to test all the CRUD operations.