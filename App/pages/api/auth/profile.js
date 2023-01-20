import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../utils/session';
import { msalInstance } from '../../../msal';
import { getGraphClient } from '../../../utils/graphClient';

async function profile(req, res) {
    try {
        const cache = msalInstance.getTokenCache();
        const currentAccounts = await cache.getAllAccounts();        
        const tokenRequest = {
            scopes: ['user.read'],
            account: currentAccounts,
        };
        const tokenResponse = await msalInstance.acquireTokenSilent(tokenRequest);
        const graphResponse = await getGraphClient(tokenResponse.accessToken).api('/me').responseType('raw').get();
        const data = await graphResponse.json();
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

export default withIronSessionApiRoute(profile, sessionOptions);