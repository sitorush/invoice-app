import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Home = props => (
  <div className="col-xs-12">
    <h1>Home</h1>
    <p>Work in progress</p>
  </div>
)

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)