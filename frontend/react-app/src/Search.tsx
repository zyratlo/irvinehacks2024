import 'bootstrap/dist/css/bootstrap.min.css'
import './Search.css'
import SearchBar from './components/SearchBar.tsx'

function Search() {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center general-formatting">
                <form>
                    <SearchBar />
                </form>
            </div>
        </>
    )
}

export default Search;