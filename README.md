```markdown
# EasyAccess

EasyAccess is a full-stack web application built with Next.js (React) and Spring Boot that helps users find, share, and manage accessible public spaces in their city. Whether you're using a wheelchair, pushing a stroller, or just looking for inclusive locations, this app makes it easier to explore your environment.

## Features

- 🌍 Browse and search accessible locations on an interactive map
- 🔎 Filter locations by accessibility features (wheelchair access, accessible toilets, wide entrance, parking, etc.)
- ➕ Add new accessible locations
- ✏️ Edit and delete locations (with role-based permissions)
- 🗑️ Prevents duplicate data on backend restarts
- 🐳 Easy deployment with Docker and Docker Compose

## Tech Stack

- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** Spring Boot (Java)
- **Database:** PostgreSQL (Dockerized)
- **Other:** Docker, Docker Compose

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) installed

### Running the App

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yannick-itoua/EasyAccess
   cd EasyAccess
   ```

2. **Start all services with Docker Compose:**
   ```sh
   docker-compose up --build
   ```

3. **Access the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8080/api/locations](http://localhost:8080/api/locations)
   - Database: [localhost:5432](localhost:5432) (Postgres, user/pass: `easyaccess`)

### Resetting the Database

To reset the database and remove all data (including duplicates):

```sh
docker-compose down
docker volume rm easyaccess_db_data
docker-compose up --build
```

### Preventing Duplicate Data

The backend only loads sample data if the locations table is empty, so you won't get duplicates on restart.

## Project Structure

```
EasyAccess/
├── easyaccess-frontend/   # Next.js frontend
├── easyaccess-backend/    # Spring Boot backend
├── docker-compose.yml
└── README.md
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.


---

**Enjoy exploring accessible places with EasyAccess!**
