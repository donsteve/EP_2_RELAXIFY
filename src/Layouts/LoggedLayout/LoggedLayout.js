import React, {useState} from "react";
import { Grid } from "semantic-ui-css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/Routes";
import MenuLeft from "../../components/MenuLeft";


import "./LoggedLayout.scss";

export default function LoggedLayout(props) {
    const { user } = props;
    
    
    
    
    return(
      <Router>
        <Grid className="logged-layout">
            <Grid.Row>
                <Grid.Column width={3}>
                    <MenuLeft user={user}/>
                </Grid.Column>
                <Grid.Column className="content" width={13}>
                    <h2>TopBar</h2>
                    <Routes />
                    <h2>Content</h2>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <h2>Player</h2>
                </Grid.Column>
            </Grid.Row>
        </Grid>
      </Router>  
    );
}