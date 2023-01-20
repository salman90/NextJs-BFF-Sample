import { useEffect } from "react"
import PageLayout from '../components/PageLayout';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '../utils/session';
import { useState } from "react";
import { ProfileData } from '../components/DataDisplay'

export default function Profile({ account }) {
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        async function fetchProfileData() {
            const response = await fetch('/api/auth/profile');
            const data = await response.json();
            setGraphData(data);
        }

        if (!!graphData) {
            return;
        }
        fetchProfileData();
    }, [graphData]);

    return (
        <PageLayout account={account}>
            {graphData ? <ProfileData  graphData={graphData} /> : null};
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
