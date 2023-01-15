import NavigationBar  from './NavigationBar';

export default function PageLayout(props) {
    return (
        <>
            <NavigationBar />
            <br />
            <h5>
                <center>Welcome to the Microsoft Authentication Library For React Tutorial</center>
            </h5>
            <br />
            {props.children}
            <br />
        </>
    );
}
