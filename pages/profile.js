import { useEffect } from "react"
export default function Profile() {
    useEffect(() => {
        async function fetchProfileData() {
            const response = await fetch('/api/auth/profile');
            const data = await response.json();
            console.log(data)
        }
        fetchProfileData();
    }, []);
    return (
        <h2>Profile</h2>
    )
}
