import { msalInstance } from '../../../msal';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../utils/session';

async function redirect(req, res) {
    const tokenRequest = {
        code: req.query.code,
        scopes: ['user.read'],
        redirectUri: 'http://localhost:3000/api/auth/redirect',
        codeVerifier: req.session.pkceCodes.verifier, // PKCE Code Verifier
        // clientInfo: req.query.client_info,
    };

    try {
        const tokenResponse = await msalInstance.acquireTokenByCode(tokenRequest);
       
        req.session.account = tokenResponse.account;
        
        req.session.isLoggedIn =  true;
        await req.session.save();
        res.redirect(307, 'http://localhost:3000/');
    } catch(error) {
        console.log(error);
    }
}

export default withIronSessionApiRoute(redirect, sessionOptions);