import SearchForm from "../search/Search";
import UserList from "./user-list/UserList";
import { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";

const baseUrl = 'http://localhost:3030/jsonstore'


export default function UserSection() {

    const [users, setUsers] = useState();


    useEffect(() => {
        (async function getUsers() {

            const response = await fetch(`${baseUrl}/users`);
            const result = await response.json();

        })();

    }, [])

    return (
        <>
            <section className="card users-container">
                <SearchForm />

                <UserList />
                <Pagination />

            </section>

        </>
    );
}