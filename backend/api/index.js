import express from "express";
import { logger } from "./middlewares/logger.mjs";
import { router } from "./routes/routes.mjs";
import { getAccessToken } from "./spotify/spotify.mjs";
import { configDotenv } from "dotenv";
import cors from 'cors';

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors(
    {
        // origin: ['https://lrc-get-new.vercel.app/', 'https://lrc-get.alien501.in/']
    }
));
app.use(logger);

app.use('/api/v1', router);

// Initailising Spotify
getAccessToken();
setInterval(() => {
    getAccessToken();
    console.log('Intialised Access Token');
}, 3600000);

app.listen(PORT, () => {
    console.log('Server running on localhost:3000');
})