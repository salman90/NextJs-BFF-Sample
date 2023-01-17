import { Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import Link from "next/link";


export default function NavigationBar() {
    const handleLoginPopup = async () => {
        try {
            const response = await fetch('/api/auth/login');
            const data = await response.json();
            console.log(data, " data")
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout');
            const data = await response.json();
             console.log(data, ' data');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Navbar className="navbarStyle" bg="primary" variant="dark" className="navbarStyle">
            <Link className="navbar-brand" href="/">
                Microsoft identity platform
            </Link>
            <Link className="navbarButton" href="/profile">
                Profile
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
                    <Dropdown.Item as="button" onClick={handleLogout}>
                        Sign out using Popup
                    </Dropdown.Item>
                </DropdownButton>
            </div>
        </Navbar>
    );
}