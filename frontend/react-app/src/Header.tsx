import SiteTitle from "./components/header_components.tsx"
import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.css'

function Header() {
    const styling = {
        fontFamily: 'Pluto'
    }
    return (
        <>
            <div className="colored-box text-center colored-box-header" style={styling}>
                <SiteTitle />
            </div>
        </>
    )
}

export default Header;