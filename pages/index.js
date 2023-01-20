import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '../utils/session';
import { Container } from 'react-bootstrap';
import { IdTokenData } from '../components/DataDisplay';
import PageLayout from '../components/PageLayout';

export default function Home({ account }) {
    return (
        <PageLayout account={account}>
            {account ? (
                <Container>
                    <IdTokenData idTokenClaims={account.idTokenClaims} />
                </Container>
            ) : null}
        </PageLayout>
    );
}

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
    let account = null;
    if (req.session?.account) {
        account = req.session.account;
    }
    return {
        props: {
            account: account,
        },
    };
}, sessionOptions);
