import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import Client from '../client'
import ClientCreate from '../client/create'
import ClientEdit from '../client/edit'
import Home from '../home'
import Settings from '../settings'

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="top-bar bg-primary">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <Link to="/" className="admin-logo">
                  <h1>Invoice App</h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Navbar staticTop>
          <div id="navbar" className="navbar-collapse collapse">
            <Nav>
              <IndexLinkContainer to="/"><NavItem eventKey={1}><i className="icon-home"></i> Home</NavItem></IndexLinkContainer>
              <LinkContainer to="/client"><NavItem eventKey={2}><i className="icon-bag"></i> Client</NavItem></LinkContainer>
              <LinkContainer to="/settings"><NavItem eventKey={3}><i className="icon-settings"></i> Settings</NavItem></LinkContainer>
            </Nav>
          </div>
        </Navbar>
        
        <div className="h-main-content">
          <div className="container">
            <div className="row">
              <Route exact path="/" component={Home} />
              <Route exact path="/client" component={Client} />
              <Route exact path="/client/create" component={ClientCreate} />
              <Route exact path={"/client/edit/:id"} component={ClientEdit} />
              <Route exact path="/settings" component={Settings} />
            </div>
          </div>
          <footer className="footer">
            <div className="container text-center">
              <span>Copyright &copy; 2017. Sitorus Internet</span>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}
