import SearchForm from "../search/Search";
import UserList from "./user-list/UserList";
export default function UserSection() {
    return (
        <>
            <section className="card users-container">
                <SearchForm />

                <UserList />


            </section>

        </>
    );
}