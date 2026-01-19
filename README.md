# 🐱 NestJS + Prisma Full Backend

NestJS + TypeScript + Prisma + Swagger + JWT + Security template.

## Stack

- NestJS
- TypeScript
- Prisma ORM (PostgreSQL)
- Swagger (OpenAPI)
- JWT Authentication (Passport)
- class-validator
- class-transformer
- Helmet
- Bcrypt

## Getting Started

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Run in development mode
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (watch mode) |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to DB |
| `npm run db:migrate` | Run migrations |
| `npm run db:studio` | Open Prisma Studio |

## API Documentation

Swagger UI: `http://localhost:3000/api/docs`

## API Endpoints

### General
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Welcome message |
| GET | /health | Health check |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login user |
| GET | /auth/me | Get current user (protected) |

### Users (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | List all users |
| GET | /users/:id | Get user by ID |
| DELETE | /users/:id | Delete user |

## Project Structure

```
src/
├── main.ts
├── app.module.ts
├── app.controller.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   └── dto/
│       └── auth.dto.ts
└── users/
    ├── users.module.ts
    ├── users.controller.ts
    └── users.service.ts
prisma/
└── schema.prisma
```
