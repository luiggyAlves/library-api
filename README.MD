
# 📚 Library API

REST API for book management, developed with **Node.js**, **Fastify**, and **SQLite**, **fully documented according to the OpenAPI (OAS) specification version 3.2.0**.

> ✅ This project explicitly follows the **OpenAPI 3.2.0** standard, as defined at:
> [https://spec.openapis.org/oas/v3.2.0.html](https://spec.openapis.org/oas/v3.2.0.html)

---

## 🚀 Overview

The **Library API** provides RESTful endpoints to perform **CRUD (Create, Read, Update, Delete)** operations on a collection of books.

Each book has the following attributes:

* `id` — unique identifier
* `title` — book title
* `author` — author name
* `count` — available quantity

---

## 🧱 Technologies Used

* Node.js
* Fastify
* SQLite
* Sequelize ORM
* OpenAPI 3.2.0

---

## 📦 Installation

```bash
git clone https://github.com/luiggyAlves/library-api.git
cd library-api
npm install
```

---

## ▶️ How to Run

### Development mode

```bash
npm run dev
```

The server will start at:

```
http://localhost:3000
```

### Production mode

```bash
npm start
```

Make sure Node.js is installed (version 18 or higher is recommended).

---

## 📂 Project Structure

```
library-api/
├── index.js            # Application entry point
├── package.json
├── package-lock.json
├── db/
│   └── config.js       # Database configuration
├── models/
│   └── book.js         # Book model definition
├── routes/
│   ├── index.js        # Route aggregator
│   └── booksRouter.js  # Book-related routes
└── node_modules/
```
---

## 📘 Endpoints

### 🔍 List all books

**GET** `/books`

#### 200 Response

```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "count": 2
  }
]
```

---

### 🔎 Get book by ID

**GET** `/books/{id}`

#### Parameters

| Name | In   | Type    | Required |
| ---- | ---- | ------- | -------- |
| id   | path | integer | yes      |

#### 200 Response

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "count": 2
}
```

---

### ➕ Create a new book

**POST** `/books`

#### Request body

```json
{
  "title": "Domain-Driven Design",
  "author": "Eric Evans"
}
```

📌 If a book with the same title already exists, the `count` field is automatically incremented.

---

### ✏️ Update a book

**PUT** `/books/{id}`

#### Parameters

| Name | In   | Type    | Required |
| ---- | ---- | ------- | -------- |
| id   | path | integer | yes      |

#### Request body

```json
{
  "title": "Refactoring",
  "author": "Martin Fowler"
}
```

---

### 🗑️ Delete a book

**DELETE** `/books/{id}`

#### Parameters

| Name | In   | Type    | Required |
| ---- | ---- | ------- | -------- |
| id   | path | integer | yes      |

---

## 🧩 Data Model

### 📘 Book

```json
{
  "id": 1,
  "title": "string",
  "author": "string",
  "count": 1
}
```

---

## 📜 OpenAPI 3.2.0 Specification

```yaml
openapi: 3.2.0
info:
  title: Library API
  description: REST API for book management
  version: 1.0.0

servers:
  - url: http://localhost:3000

paths:
  /books:
    get:
      summary: List all books
      responses:
        "200":
          description: List of books
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Book"
    post:
      summary: Create a new book
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/BookInput"
      responses:
        "201":
          description: Book created

  /books/{id}:
    get:
      summary: Get book by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        "200":
          description: Book found
    put:
      summary: Update a book
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/BookInput"
      responses:
        "200":
          description: Book updated
    delete:
      summary: Delete a book
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        "204":
          description: Book deleted

components:
  schemas:
    Book:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
        author:
          type: string
        count:
          type: integer

    BookInput:
      type: object
      required:
        - title
        - author
      properties:
        title:
          type: string
        author:
          type: string
```

---

## 📚 Learnings

* REST API design principles
* Fastify routing and plugins
* SQLite and Sequelize integration
   
---

## 📄 License

This project is open-source and can be used for educational or commercial purposes.

---

## 👨‍💻 Author: Luiggy Alves
- Computer Science student at the Federal University of Amazonas
- Project developed as part of the challenges proposed in the book “Learn Node.js with Real Projects” by Jonathan Wexler.
