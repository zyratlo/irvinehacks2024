import SiteTitle from "./components/header_components.tsx"
import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.css'
function Header() {
    return (
        <>
            <div className="colored-box text-center colored-box-header">
                <SiteTitle />
            </div>
        </>
    )
}

export default Header;