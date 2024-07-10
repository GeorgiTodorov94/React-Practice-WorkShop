import SearchForm from "../search/Search";
import UserList from "./user-list/UserList";
import { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";
import UserAdd from "./user-add/UserAdd";

const baseUrl = 'http://localhost:3030/jsonstore'


export default function UserSection(props) {

    const [users, setUsers] = useState([]);
    const [onClickAddUser, setOnClickAddUser] = useState(false);


    useEffect(() => {
        (async function getUsers() {

            try {
                const response = await fetch(`${baseUrl}/users`);
                const result = await response.json();
                const users = Object.values(result);
                setUsers(users)
            } catch (error) {
                alert(error.message);
            }

        })();

    }, [])

    const addUserClickHandler = () => {

    }

    return (
        <>
            <section className="card users-container">
                <SearchForm />

                <UserList users={users} />

                <UserAdd />
                <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

                <Pagination />

            </section>

        </>
    );
}