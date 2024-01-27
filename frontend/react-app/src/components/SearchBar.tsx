import 'bootstrap/dist/css/bootstrap.min.css'

function SearchBar() {
    const button = {
        width: '100%',
        height: '5vh',
        backgroundColor: '#773344',
    }

    const inputBox = {
        marginBottom: '10px'
    }
    return (
        <>
            <div className="mb-3">
                <label htmlFor="Input1" className="form-label">Search</label>
                <input type="text" className="form-control" id="Input1" placeholder="Add A Symptom..." style={inputBox}/>
                <button className="btn btn-primary" style={button}>Search</button>
            </div>
        </>
    )
}

export default SearchBar;