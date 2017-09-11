import React from 'react';
import { Link } from 'react-router-dom'
import { appName } from '../../config'

const Header = () =>
  <Link to="/" className="admin-logo">
    <h1>{appName}</h1>
  </Link>

export default Header;
