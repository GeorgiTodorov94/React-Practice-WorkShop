import SearchForm from "../search/Search";
import UserList from "./user-list/UserList";
import { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";

const baseUrl = 'http://localhost:3030/jsonstore'


export default function UserSection(props) {

    const [users, setUsers] = useState([]);


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

    return (
        <>
            <section className="card users-container">
                <SearchForm />

                <UserList users={users} />
                <button className="btn-add btn">Add new user</button>

                <Pagination />

            </section>

        </>
    );
}