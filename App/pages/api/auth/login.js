import { withIronSessionApiRoute } from 'iron-session/next';
import { msalInstance } from '../../../msal';
import { CryptoProvider } from '@azure/msal-node';
import { sessionOptions } from '../../../utils/session';

async function login(req, res) {
    try {
        const cryptoProvider = new CryptoProvider();
        const { verifier, challenge } = await cryptoProvider.generatePkceCodes();
        if (!req.session.pkceCodes) {
            req.session.pkceCodes = {
                challengeMethod: 'S256',
            };
        }
        // Set generated PKCE Codes as session vars
        req.session.pkceCodes.verifier = verifier;
        req.session.pkceCodes.challenge = challenge;
        
        await req.session.save();

        const authCodeUrlParams = {
            scopes: ['user.read'],
            redirectUri: 'http://localhost:3000/api/auth/redirect',
            codeChallenge: req.session.pkceCodes.challenge,
            codeChallengeMethod: req.session.pkceCodes.challengeMethod,
            // responseMode: 'form_post',
        };
        
        const codeUrl = await msalInstance.getAuthCodeUrl(authCodeUrlParams);
        
        res.redirect(307, codeUrl);
    } catch (error) {
        throw error;
    }
}

export default withIronSessionApiRoute(login, sessionOptions);
