import 'bootstrap/dist/css/bootstrap.min.css'

function SearchBar() {
    const searchBarStyle = {}
    return (
        <>
            <div className="mb-3">
                <label htmlFor="Input1" className="form-label">Search</label>
                <input type="text" className="form-control" id="Input1" placeholder="Add A Symptom..."
                style={searchBarStyle}/>
            </div>
        </>
    )
}

export default SearchBar;