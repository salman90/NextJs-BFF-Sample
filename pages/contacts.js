export default function Contacts({ contactsData }) {
    console.log(contactsData);
    return <h2>Contacts</h2>;
}

export async function getServerSideProps() {
    const response = await fetch('http://localhost:3000/api/contacts');
    const data = await response.json();
    return {
        props: {
            contactsData: data
        }
    }
}