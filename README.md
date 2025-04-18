# Task Management API

This is a Task Management API built with **NestJS**, **TypeORM**, and **PostgreSQL**. It allows users to create, read, update, and delete tasks while also implementing features like pagination and filtering.

## Features

- **Create**: Create new tasks with details like name, due date, priority, and status.
- **Read**: Get a list of tasks with pagination and filtering options (by status, priority).
- **Update**: Update task details, including status, priority, and other fields.
- **Delete**: Delete a task by ID.
- **Pagination**: Supports pagination for listing tasks (`page` and `limit` query parameters).
- **Filtering**: Filters tasks based on `status` and `priority`.

## Technologies

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeORM**: ORM for working with SQL databases.
- **PostgreSQL**: A powerful, open-source object-relational database.
- **Swagger**: For API documentation.
- **Class-Validator**: For data validation.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/task-management-api.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add the following environment variables:
    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your-username
    DB_PASSWORD=your-password
    DB_DATABASE=todo_db
    ```

4. Start the server:
    ```bash
    npm run start
    ```

You can then access the swagger documentation at http://localhost:3000/api
