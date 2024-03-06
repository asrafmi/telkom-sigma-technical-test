# Telkom Sigma Technical Test

## Tech Stack
- Express JS (Typescript)
- MySQL
- Sequelize
- NextJS
- Tailwind CSS

## Prerequisites
- Node v.18+
- Typescript v.4+
- Sequelize CLI
- Docker

## How to Start The Project
- You need to run both, frontend and backend
### Frontend
- cd frontend
- yarn install
- copy .env.example to .env
- Complete the env vars using these env vars
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```
- yarn start
- visit http://localhost:3001
### Backend
- cd backend
- yarn install
- cd docker
- docker-compose up -d (if you are not linux user, make sure you run on WSL terminal. This command will automatically run mysql and phpmyadmin. Or you can run mysql and phpmyadmin using your own way)
- copy .env.example to .env
- Complete the env vars using these env vars (if you run using the docker-compose. if not, just adjust with your own env vars)
```
APP_NAME=Backend Service - Telkom Sigma Technical Test
PORT=3000
MYSQL_HOST=localhost
MYSQL_DATABASE=telkom-sigma-technical-test
MYSQL_USER=admin
MYSQL_PASSWORD=admin123
JWT_TOKEN="asdfASDF1234!@#$"
```
- yarn start
- visit http://localhost:3000/api-docs for the API documentation
### Database Migration
- cd backend
- yarn migrate-up (for run migration)
- yarn migrate-down (for undo migration)

## Testing
- cd backend
- yarn test or yarn test:cov
