<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Product & Category API

A NestJS project with Prisma for managing categories, products, and product items with multilingual content and pricing.

## Features

- Manage Categories (with subcategories and multilingual content)
- Manage Products (linked to categories, with multilingual content)
- Manage Product Items (with prices, variations, and multilingual content)
- Search Products by name, description, price, and currency

## Requirements

- Node.js >= 18
- PostgreSQL
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repo-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

or

```bash
yarn
```

### 3. Configure environment

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
```

Replace `username`, `password`, and `dbname` with your PostgreSQL credentials.

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Run migrations

```bash
npx prisma migrate dev --name init
```

This will create the database tables.

### 6. Start the server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`.

### 7. Testing

You can test the endpoints with **Postman** or any REST client. Example endpoints:

- `POST /categories` – Create a category
- `POST /products` – Create a product
- `POST /product-items` – Create a product item
- `GET /products/search?name=Smartphone&minPrice=100&maxPrice=500&currency=USD` – Search products

### 8. Prisma Studio (optional)

```bash
npx prisma studio
```

Open a GUI to browse and edit your database.

