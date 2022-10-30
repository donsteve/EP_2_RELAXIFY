import React, { useState, useEffect } from 'react';
import { Menu, Icon } from "semantic-ui-react";
import { Link, WithRouter } from "react-router-dom";


import "./MenuLeft.scss";


function MenuLeft(props) {
    const { user, location } = props;
    const [activeMenu, setActiveMenu] = useState(location.pathname);



    const handlerMenu = (e, menu) => {
       setActiveMenu(menu.to); 
    }


  return (
    <Menu className="menu-left" vertical>
        <div className="top">
            <Menu.Item 
            as={Link} 
            to="/" 
            name="home" 
            active={activeMenu === "/"} 
            onClick={handlerMenu}>
                <Icon name="home" /> Inicio
            </Menu.Item>
            <Menu.Item 
            as={Link} 
            to="/artists"  
            name="artists" 
            active={activeMenu === "/artists"}
            onClick={handlerMenu}
            >
                <Icon name="music" /> Genero
            </Menu.Item>
            <Menu.Item 
            as={Link} 
            to="/canciones" 
            name="canciones"
            active={activeMenu === "/canciones"}
            onClick={handlerMenu}
            >
                <Icon name="music" /> Canciones
            </Menu.Item>
        </div>
        <div className="footer">
            <Menu.Item>
                <Icon name="plus square outline" /> Agregar Genero
            </Menu.Item>
            <Menu.Item name="artist">
                <Icon name="plus square outline" /> Agregar Cancion
            </Menu.Item>
        </div>
    </Menu>    
  );
}


export default WithRouter(MenuLeft);