import { Router } from "express";
import { getLyrics } from "../getLyrics.mjs";


const router = Router();

router.get('/', (req, res, next) => {
    try {
        return res.status(200).send({
            message: "Welcome to Spotify Lyric API",
            status: 200,
            error: null
        })
    } catch (error) {
        return res.status(500).send({
            message: "Internal sever error",
            status: 500,
            error: error
        })
    }
})
router.get('/getSongData', getLyrics)

export {
    router
}