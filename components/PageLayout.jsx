import NavigationBar  from './NavigationBar';

export default function PageLayout({ children, account }) {
    return (
        <>
            <NavigationBar account={account} />
            <br />
            <h5>
                <center>Welcome to the Microsoft Authentication Library For React Tutorial</center>
            </h5>
            <br />
            {children}
            <br />
        </>
    );
}
