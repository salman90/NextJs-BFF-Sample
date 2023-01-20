import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../utils/session';
import { msalInstance } from '../../../msal';

async function logout(req, res) {
    await msalInstance.getTokenCache().removeAccount(req.session.account);
    req.session.destroy();
    res.redirect(307, 'http://localhost:3000/');
}

export default withIronSessionApiRoute(logout, sessionOptions);