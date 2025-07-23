# Docreader

Docreader is a full-stack PDF reading and processing application, consisting of an Angular frontend and a Node.js backend. The backend leverages AI APIs (e.g., Gemini) for document analysis.

---

## Project Structure

```
PDFReader-Angular/      # Angular frontend
PDFReader-BackEnd/      # Node.js backend
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

---

## Setup Instructions

### 1. Local Development (without Docker)

#### Backend

```bash
cd PDFReader-BackEnd
npm install
# Create a .env file and set GEMINI_API_KEY=your_api_key
node server.js
```

#### Frontend

```bash
cd PDFReader-Angular
npm install
ng serve
```

Visit [http://localhost:4200](http://localhost:4200)

---

### 2. Dockerized Setup

#### Build and Run

1. Build the Docker images for both frontend and backend:

   ```bash
   cd PDFReader-Angular
   docker build -t frontend .
   cd ../PDFReader-BackEnd
   docker build -t backend .
   ```

2. Start the services using Docker Compose from the Angular app directory:

   ```bash
   cd ../PDFReader-Angular
   docker-compose up -d
   ```

#### ⚠️ Important: API Token Configuration

- The backend requires a `GEMINI_API_KEY` environment variable. You can set it directly in `docker-compose.yml` or via a `.env` file in `PDFReader-BackEnd`.
- **If your Angular frontend also needs access to the token (e.g., for SSR or API calls), add the following under `angular-frontend` in `PDFReader-Angular/docker-compose.yml`:**
  ```yaml
  environment:
    - GEMINI_API_KEY=your_api_key_here
  ```
- Never commit your real API keys to version control.

---

## Environment Variables

- `GEMINI_API_KEY` (required by backend, possibly frontend): Your Gemini/AI API key.
- For local dev, create a `.env` file in `PDFReader-BackEnd`:
  ```env
  GEMINI_API_KEY=your_api_key_here
  ```

---

## Scripts & Useful Commands

### Angular Frontend

- `npm start` / `ng serve` — Start dev server
- `ng build` — Build for production
- `ng test` — Run unit tests
- `ng e2e` — Run end-to-end tests

### Node Backend

- `node server.js` — Start backend server

---

## Testing

### Frontend

- **Unit tests:**
  ```bash
  ng test
  ```
- **End-to-end tests:**
  ```bash
  ng e2e
  ```
  (Configure your preferred e2e framework if not set up.)

### Backend

- No test scripts defined by default. Add tests as needed.

---

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Node.js Documentation](https://nodejs.org/en/docs)
- [Docker Compose Docs](https://docs.docker.com/compose/)

---

## Notes

- For production, ensure all secrets and API keys are managed securely (e.g., with Docker secrets or environment managers).
- For any issues, consult the respective documentation or raise an issue in this repository.
