const response_type = 'code'
let redirect_uri;
if(process.env.PORT == '10000') {
    redirect_uri = `https://${process.env.HOST}/login/google/callback`
} else {
    redirect_uri = `http://${process.env.HOST}:${process.env.PORT}/login/google/callback`
}
const client_id = process.env.GG_CLIENT_ID
const client_secret = process.env.GG_CLIENT_SECRET
const scope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
].join(' ')
const grant_type = 'authorization_code'
module.exports = {
    query: new URLSearchParams({
        response_type,
        redirect_uri,
        client_id,
        scope
    }),
    ggLoginUrl: `https://accounts.google.com/o/oauth2/v2/auth`,
    ggAuthApiUrl: `https://accounts.google.com/o/oauth2/token`,
    getGGAuthApiOption: (code) => {
        return {
            code,
            grant_type,
            client_id,
            client_secret,
            redirect_uri
        }
    },
    ggInfoApiUrl: `https://www.googleapis.com/oauth2/v2/userinfo`
}