import 'bootstrap/dist/css/bootstrap.min.css'
import './Search.css'
import SearchBar from './components/SearchBar.tsx'

function Search() {
    const formStyle = {
        width: '80%'
    }
    return (
        <>
            <div className="d-flex justify-content-center general-formatting">
                <form style={formStyle}>
                    <SearchBar />
                </form>
            </div>
        </>
    )
}

export default Search;