import 'bootstrap/dist/css/bootstrap.min.css'
import CheckboxComponent from './checkbox'
import { ChakraProvider } from '@chakra-ui/react';

function SearchBar() {
    return (
        <ChakraProvider>
            <div>
                {/* <label htmlFor="Input1" className="form-label">Search</label>
                <input type="text" className="form-control" id="Input1" placeholder="Add A Symptom..." style={inputBox}/> */}
                <CheckboxComponent />
                {/* <button className="btn btn-primary" style={button}>Search</button> */}
            </div>
        </ChakraProvider>
    )
}

export default SearchBar;