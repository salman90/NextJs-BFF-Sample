import { Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import Link from "next/link";


export default function NavigationBar({ account }) {
    return (
        <Navbar className="navbarStyle" bg="primary" variant="dark">
            <Link className="navbar-brand" href="/">
                Microsoft identity platform
            </Link>
            {account ? (
                <>
                    <Link className="navbarButton" href="/profile">
                        Profile
                    </Link>
                    <div className="collapse navbar-collapse justify-content-end">
                        <DropdownButton variant="warning" drop="start" title={account ? account.name : 'Unknown'}>
                            <form method="GET" action="/api/auth/logout">
                                <Dropdown.Item as="button">
                                    Sign out
                                </Dropdown.Item>
                            </form>
                        </DropdownButton>
                    </div>
                </>
            ) : (
                <>
                    <div className="collapse navbar-collapse justify-content-end">
                        <DropdownButton
                            variant="secondary"
                            className="justify-content-end ml-auto"
                            title="Sign In"
                            drop="start"
                        >
                            <form method="GET" action="/api/auth/login">
                                <Dropdown.Item as="button" type="submit">
                                    Sing in
                                </Dropdown.Item>
                            </form>
                        </DropdownButton>
                    </div>
                </>
            )}
        </Navbar>
    );
}