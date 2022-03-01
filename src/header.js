import React from "react";
import  {Link } from "react-router-dom";

function Header() {
    return (
        <nav>
            <Link exact activeClassName="active" to="/pages/member.js">
                Member
            </Link>
            <Link exact activeClassName="active" to="/pages/paket.js"> 
                Paket
            </Link>
            <Link exact activeClassName="active" to="/pages/user.js"> 
                User
            </Link>
        </nav>

    )
}

export default Header;