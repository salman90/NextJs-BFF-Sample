import { ListView } from "../components/ListView";
const TodoListContent = ({ todoListData  }) => {
    return <>{todoListData ? <ListView todoListData={todoListData} /> : null}</>;
};

export default function TodoList({ todoListData }) {
    return <TodoListContent todoListData={todoListData} />;
}


export async function getServerSideProps() {
    const response = await fetch('http://localhost:3000/api/todos');
    const data = await response.json()
    return {
        props: {
            todoListData: data.todos,
        },

    };
}
