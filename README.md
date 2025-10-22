# Summoner Stats Portal

A fan-made web portal to track and analyze League of Legends summoner statistics.

## Setup

1. **Create `.env.local`**

Copy `.env.example` to `.env.local`:

  ```bash
  cp .env.example .env.local
  ```

2. **Add your Riot API key**

Fill in your Riot API key in `.env.local`

  ```env
  VITE_RIOT_API_KEY=your_api_key_here
  VITE_BASE_URL=https://americas.api.riotgames.com/
  ```

3. **Install dependencies and start the project**

  ```
  npm install
  npm run dev
  ```

### Notes

* This project is fan-made and not monetized.
* Make sure not to commit your .env.local file with your API key.