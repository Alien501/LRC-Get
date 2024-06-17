import axios from "axios";

let currentAccessToken = '';

const getAccessToken = async () => {
    try{
        const tokenEndPoint = process.env.TOKENENDPOINT;
        const clientId = process.env.CLIENTID;
        const clientSecret = process.env.CLIENTSECRET;
        
        const res = await axios.post(
            tokenEndPoint,
            `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        )
        currentAccessToken = res.data.access_token;
    }catch(error){
        console.log(error);
        currentAccessToken = null;
    }
}

export {
    currentAccessToken,
    getAccessToken
}