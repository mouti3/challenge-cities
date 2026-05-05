# ottonova Challenge — Cities Explorer

A full-stack monorepo with a **NestJS** backend and an **Angular** frontend.

## Backend

```bash
cd backend
npm install
npm run start:dev
```

API: `http://localhost:3000` — Swagger UI: `http://localhost:3000/api`

## Generate Angular API client

Run once after the backend starts (or whenever the API changes):

```bash
cd backend
npm run openapi:generate:frontend
```

## Frontend

```bash
cd frontend
npm install
npm start
```

App: `http://localhost:4200`

---

## Running Tests

### Backend (Jest)

```bash
cd backend
npm test              # run all unit tests
npm run test:cov      # with coverage report
npm run test:e2e      # end-to-end tests
```

### Frontend (Vitest)

```bash
cd frontend
npm test              # run unit tests with coverage
```

Coverage excludes the auto-generated `src/app/api/` directory.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | NestJS 11, TypeScript, Swagger/OpenAPI |
| Frontend | Angular 21, PrimeNG (Aura), Signals |
| Testing (BE) | Jest 30, ts-jest |
| Testing (FE) | Vitest 4, @vitest/coverage-v8 |
| Code gen | @openapitools/openapi-generator-cli |
