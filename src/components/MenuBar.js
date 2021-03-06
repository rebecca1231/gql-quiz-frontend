import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const navBar = user ? (
    <Menu pointing secondary size="large" color="orange">
       <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />

      <Menu.Item
        name="create"
        active={activeItem === "create"}
        onClick={handleItemClick}
        as={Link}
        to="/create"
      />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
        <Menu.Item
          name="about"
          active={activeItem === "about"}
          onClick={handleItemClick}
          as={Link}
          to="/about"
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary color="blue">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item
        name="create"
        active={activeItem === "create"}
        onClick={handleItemClick}
        as={Link}
        to="/create"
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      <Menu.Item
          name="about"
          active={activeItem === "about"}
          onClick={handleItemClick}
          as={Link}
          to="/about"
        />
      </Menu.Menu>
    </Menu>
  );

  //ctrl + space to see all options!
  return navBar;
};

export default MenuBar;
