import { getAccessToken } from "./spotify.mjs";

export default async function handler(req, res) {
    // Only allow POST requests (cron jobs use POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: 'Method not allowed',
            message: 'This endpoint only accepts POST requests'
        });
    }

    try {
        console.log('Cron job: Starting Spotify token refresh...');
        
        // Call the getAccessToken function
        await getAccessToken();
        
        console.log('Cron job: Spotify token refreshed successfully');
        
        return res.status(200).json({ 
            success: true, 
            message: 'Spotify access token refreshed successfully',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Cron job: Failed to refresh Spotify token:', error);
        
        return res.status(500).json({ 
            success: false, 
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
} 