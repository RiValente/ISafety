import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./HambugerMenu.css"

function HamburgerMenu() {
  return (
    <Menu style={{height: "50vh"}}>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/salads">
        Salads
      </a>
      <a className="menu-item" href="/pizzas">
        Pizzas
      </a>
      <a className="menu-item" href="/desserts">
        Desserts
      </a>
    </Menu>
  );
}

export default HamburgerMenu;
