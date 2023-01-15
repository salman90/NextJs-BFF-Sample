import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageLayout from '../components/PageLayout';

export default function App({ Component, pageProps }) {
    return (
        <PageLayout>
            <Component {...pageProps} />;
        </PageLayout>
    );
}
