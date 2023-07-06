export default function NavBar() {
    return (
        <nav className="nav">
            <div href="/warehouses" className="site-title">Willy's Warehouses</div>
            <ul className="nav-list">
                <li className="nav-list-item"><a href="/warehouses" className="navbar-link">Warehouses</a></li>
                <li className="nav-list-item"><a href="/products" className="navbar-link">Products</a></li>
                <li className="nav-list-item"><a href="/productTypes" className="navbar-link">Product Types</a></li>
            </ul>
        </nav>
    )
}