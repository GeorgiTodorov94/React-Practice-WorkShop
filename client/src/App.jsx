import './App.css'
import Footer from './Components/footer/Footer'
import Header from './Components/header/Header'
import UserList from './Components/user-list/UserList'
import SearchForm from './Components/search/Search'


function App() {

    return (
        <>
            <Header />

            <main>
                <UserList />
                <SearchForm />

            </main>


            <Footer />
        </>
    )
}

export default App
