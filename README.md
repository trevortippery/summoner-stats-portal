# Summoner Stats Portal

A fan-made web portal to track and analyze League of Legends summoner statistics. Inspired by platforms like **OP.GG** and **U.GG**, this project aims to replicate their analytical experience while implementing the functionality and design using modern web technologies.

## Tech Stack
* **Frontend:** React, Vite, TailwindCSS
* **Backend:** Node.js/Fastify
* **State Management / Data Fetching:** TanStack Query (React Query)
* **Routing:** React Router
* **Language:** JavaScript
* **API:** Riot Games Developer API `https://developer.riotgames.com`
* **Version Control:** Git & GitHub

## Setup

### Backend Setup

1. **Navigate to the backend directory**
```bash
  cd api
```

2. **Create `.env` file**

  Copy `.env.example` to `.env`:
```bash
  cp .env.example .env
```

3. **Add your RIOT API key**

  Fill in your Riot API key in `.env`:
```env
  RIOT_API_KEY=your_api_key_here
```

4. **Install dependencies and start the backend**
```bash
  npm install
  node server.js
```

### Frontend Setup

1. **Navigate to the root directory**

  Open a new terminal or navigate back from the backend directory:
```bash
  cd ..
```

2. **Install dependencies and start the development server**
```bash
  npm install
  npm run dev
```

### Notes

* This project is fan-made and not monetized.
* No assets or code are copied from OP.GG or U.GG - their design and data structures serve only as reference and inspiration.
* **Security:** Never commit your `.env` file with your API key. The backend handles all API requests to keep your key secure.
* Make sure both backend and frontend servers are running for the application to work properly.