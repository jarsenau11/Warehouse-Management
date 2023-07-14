import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function NavBar() {
    return (
        <nav className="nav">
            <div className="site-title">SmartStorage Logistics</div>
            <ul className="nav-list">
                <CustomLink to="/inventory">Inventory</CustomLink>
                <CustomLink to="/products">Products</CustomLink>
                <CustomLink to="/productTypes">Product Types</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true});

    return (
        <li className={isActive ? "active nav-list-item" : "nav-list-item"}>
            <Link to={to}>
                {children}
            </Link>
        </li>
    )
}