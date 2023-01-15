import { Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import Link from "next/link";


export default function NavigationBar() {
    const handleLoginPopup = async () => {
        try {
            const response = await fetch('/api/signin');
            const data = await response.json();
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <Navbar className="navbarStyle" bg="primary" variant="dark" className="navbarStyle">
            <Link className="navbar-brand" href="/">
                Microsoft identity platform
            </Link>
            <Link className="navbarButton" href="/todolist">
                TodoList
            </Link>
            <Link className="navbarButton" href="/profile">
                Profile
            </Link>
            <Link className="navbarButton" href="/contacts">
                Contacts
            </Link>
            <div className="collapse navbar-collapse justify-content-end">
                <DropdownButton
                    variant="secondary"
                    className="justify-content-end ml-auto"
                    title="Sign In"
                    drop="start"
                >
                    <Dropdown.Item as="button" onClick={handleLoginPopup}>
                        Sign in using Popup
                    </Dropdown.Item>
                    <Dropdown.Item as="button">Sign in using Redirect</Dropdown.Item>
                </DropdownButton>
            </div>
        </Navbar>
    );
}