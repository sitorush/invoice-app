import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import ClientHome from '../client/home'
import ClientCreate from '../client/create'
import ClientEdit from '../client/edit'

import InvoiceCreate from '../invoice/create'
import InvoiceEdit from '../invoice/edit'
import InvoiceHome from '../invoice/home'

import Home from '../home'
import Settings from '../settings/settings'
import Footer from '../../components/footer'
import Header from '../../components/header'


export default class App extends Component {
  render() {
    return (
      <div>
        <div className="top-bar bg-primary">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <Header />
              </div>
            </div>
          </div>
        </div>
        <Navbar staticTop>
          <div id="navbar" className="navbar-collapse collapse">
            <Nav>
              <IndexLinkContainer to="/"><NavItem eventKey={1}><i className="icon-home"></i> Home</NavItem></IndexLinkContainer>
              <LinkContainer to="/invoice"><NavItem eventKey={2}><i className="icon-list"></i> Invoice</NavItem></LinkContainer>
              <LinkContainer to="/client"><NavItem eventKey={2}><i className="icon-bag"></i> Client</NavItem></LinkContainer>
              <LinkContainer to="/settings"><NavItem eventKey={3}><i className="icon-settings"></i> Settings</NavItem></LinkContainer>
            </Nav>
          </div>
        </Navbar>
        
        <div className="h-main-content">
          <div className="container">
            <div className="row">
              <Route exact path="/" component={Home} />
              
              <Route exact path="/client" component={ClientHome} />
              <Route exact path="/client/create" component={ClientCreate} />
              <Route exact path={"/client/edit/:id"} component={ClientEdit} />

              <Route exact path="/invoice" component={InvoiceHome} />
              <Route exact path="/invoice/create" component={InvoiceCreate} />
              <Route exact path="/invoice/edit/:id" component={InvoiceEdit} />
              
              <Route exact path="/settings" component={Settings} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
