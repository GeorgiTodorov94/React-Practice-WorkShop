import SearchForm from "../search/Search";
import UserList from "./user-list/UserList";
import { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";
import UserAdd from "./user-add/UserAdd";
import UserDetails from "./user-details/UserDetails";
import UserDelete from "./user-delete/UserDelete";

const baseUrl = 'http://localhost:3030/jsonstore'


export default function UserSection(props) {

    const [users, setUsers] = useState([]);
    const [showAddUser, setShowAddUser] = useState(false);
    const [showUserDetailsById, setShowUserDetailsById] = useState(null);
    const [showUserDeleteById, setShowUserDeleteById] = useState(null);


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
        setShowAddUser(true)
    }

    const AddUserCloseHandler = () => {
        setShowAddUser(false);
    }

    const addUserSaveHandler = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userData = {
            ...Object.fromEntries(formData),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),

        };


        const response = await fetch(`${baseUrl}/users`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        const createdUser = await response.json();

        setUsers(oldUsers => [createdUser, ...oldUsers]);

        setShowAddUser(false);
    }

    const userDetailsClickHandler = (userId) => {
        setShowUserDetailsById(userId);
    }

    const userDeleteClickHandler = (userId) => {
        setShowUserDeleteById(userId)
        // console.log(userId)
    }

    const userDeleteHandler = async (userId) => {
        await fetch(`${baseUrl}/users/${userId}`, {
            method: 'DELETE',
        })
        console.log(userId)
        setUsers(oldUsers => oldUsers.filter(user => user._id !== userId));
        setShowUserDeleteById(null)
    }



    return (
        <>
            <section className="card users-container">
                <SearchForm />

                <UserList
                    users={users}
                    onUsersDetailsCLick={userDetailsClickHandler}
                    onUserDeleteClick={userDeleteClickHandler}
                />

                {showAddUser && (
                    <UserAdd
                        onClose={AddUserCloseHandler}
                        onSave={addUserSaveHandler}
                    />
                )}

                {showUserDetailsById && (
                    <UserDetails
                        user={users.find(user => user._id === showUserDetailsById)}
                        onClose={() => setShowUserDetailsById(null)}
                    />
                )}

                {showUserDeleteById && (
                    <UserDelete
                        onClose={() => setShowUserDeleteById(null)}
                        onUserDelete={() => userDeleteHandler(showUserDeleteById)}
                    />
                )}

                <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

                <Pagination />

            </section>

        </>
    );
}