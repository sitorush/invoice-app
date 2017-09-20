import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { initialize } from 'redux-form';
import { push } from 'react-router-redux';
import SettingsForm from './component/form'
import { saveSettings, getSettings } from '../../modules/settings'

export class Settings extends Component {
  componentDidMount() {
    this.props.getSettings()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings) {
      this.props.initialize('settings', nextProps.settings);
    }

    if (nextProps.saveSettingsSuccess) {
      // no fancy stuff for now, the expectation will be, 
      // the setting field can be edited and save individually
      this.props.pushState('/')
    }
  }

  componentWillUnmount() {
    this.props.initialize('settings', {});
  }

  render() {
    const { saveSettings } = this.props;
    return (
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h1>Settings</h1>
          </div>
          <div className="panel-body">
            <SettingsForm onSubmit={saveSettings} />
          </div>
        </div>
      </div>
    )
  }
}

Settings.propTypes = {
  initialize: PropTypes.func.isRequired,
  getSettings: PropTypes.func.isRequired,
  saveSettings: PropTypes.func.isRequired,
  saveSettingsSuccess: PropTypes.bool,
  settings: PropTypes.object
};

const mapStateToProps = state => ({ 
  settings: state.settings.data,  
  saveSettingsSuccess: state.settings.saveSettingsSuccess
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
  saveSettings, getSettings, initialize, pushState: push 
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)