import axios from "axios";

let currentAccessToken = '';
let lastRefreshTime = null;

const getAccessToken = async () => {
    try {
        const tokenEndPoint = process.env.TOKENENDPOINT;
        const clientId = process.env.CLIENTID;
        const clientSecret = process.env.CLIENTSECRET;
        
        // Validate environment variables
        if (!tokenEndPoint || !clientId || !clientSecret) {
            throw new Error('Missing required environment variables: TOKENENDPOINT, CLIENTID, or CLIENTSECRET');
        }
        
        console.log('Refreshing Spotify access token...');
        
        const res = await axios.post(
            tokenEndPoint,
            `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                timeout: 10000 // 10 second timeout
            }
        );
        
        if (!res.data.access_token) {
            throw new Error('No access token received from Spotify API');
        }
        
        currentAccessToken = res.data.access_token;
        lastRefreshTime = new Date().toISOString();
        
        console.log('✅ Spotify access token refreshed successfully');
        console.log(`Token expires in: ${res.data.expires_in} seconds`);
        
        return currentAccessToken;
        
    } catch (error) {
        console.error('❌ Failed to refresh Spotify access token:', error.message);
        
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        
        currentAccessToken = null;
        throw error; // Re-throw to allow caller to handle
    }
}

// Get current token (without refreshing)
const getCurrentToken = () => {
    return currentAccessToken;
}

// Get last refresh time
const getLastRefreshTime = () => {
    return lastRefreshTime;
}

// Check if token is valid (basic check)
const isTokenValid = () => {
    return !!currentAccessToken;
}

export {
    currentAccessToken,
    getAccessToken,
    getCurrentToken,
    getLastRefreshTime,
    isTokenValid
}