# KelaSkoding API Generator

This project is a command-line interface (CLI) tool that helps you quickly generate a boilerplate for a Rest API. It sets up a new project with Bun as the JavaScript runtime, Express for building the API, and Drizzle ORM for database interactions.

## Features

*   **Fast Development**: Leverages Bun for incredibly fast dependency installation and script execution.
*   **Robust API Framework**: Built with Express, a popular and flexible Node.js web application framework.
*   **Type-safe Database**: Integrates Drizzle ORM for a modern, type-safe, and performant database experience.
*   **Authentication Module**: Includes a basic authentication setup with user registration and login.
*   **Database Migrations**: Easily manage your database schema with Drizzle Kit migrations.
*   **Swagger Documentation**: Automatically generates API documentation using Swagger/OpenAPI.

## How to Start

To create a new KelaSkoding API project, follow these steps:

1.  **Generate a new project**:

    ```bash
    bun create kelaskoding-api my-new-api
    ```

    Replace `my-new-api` with your desired project name.

2.  **Navigate into your new project directory**:

    ```bash
    cd my-new-api
    ```

3.  **Install dependencies** (if not already installed by `bun create`):

    ```bash
    bun install
    ```

4.  **Configure Environment Variables**:

    Update the `.env` file with the required environment variables, especially your database connection string.


5.  **Run Database Migrations**:

    Before starting the server, apply the database migrations:

    ```bash
    bun run db:migrate
    ```

6.  **Start the Development Server**:

    ```bash
    bun run dev
    ```

    Your API server will typically run on `http://localhost:3000` (or the port specified in your `.env` file).

## Project Structure

The generated project will have a structure similar to this:

```
my-new-api/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── db/
│   │   ├── db.ts
│   │   ├── migrations/
│   │   └── schemas/
│   │       └── users.ts
│   ├── lib/
│   │   └── jwt.auth.ts
│   └── modules/
│       └── auth/
│           ├── user.controller.ts
│           ├── user.routes.ts
│           └── user.service.ts
├── .env.example
├── bun.lockb
├── drizzle.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

## Available Scripts

In the project directory, you can run:

*   `bun run dev`: Starts the development server with hot reloading.
*   `bun run start`: Starts the production server.
*   `bun run build`: Builds the project for production.
*   `bun run db:generate`: Generates new Drizzle migrations based on schema changes.
*   `bun run db:migrate`: Applies pending database migrations.
*   `bun run db:push`: Pushes the current schema state to the database (for development).
*   `bun run db:reset`: Drops all tables and reapplies migrations (use with caution!).
*   `bun run db:studio`: Opens Drizzle Studio for database visualization.
*   `bun run swagger:generate`: Generates Swagger API documentation.

## Contact

For questions, suggestions, or contributions, please contact Hendro Steven at hendro.steven@gmail.com.

## License

This project is open-sourced under the MIT License.
