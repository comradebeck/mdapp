import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as authActions from '../redux/actions/authActions';

class Starred extends PureComponent {
	componentWillMount() {
		const credentials = {
			email: "d@gmail.com",
			password: "ReCode123"
		};

		this.props.actions.authenticateLogin(credentials);
	}

  render() {
    console.log('@@ starred');
    return (
      <h1>Starred</h1>
    );
  }
}

Starred.propTypes = {
	user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(authActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Starred);