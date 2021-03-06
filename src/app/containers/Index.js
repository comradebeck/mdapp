import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import SelectField from 'react-md/lib/SelectFields';
import FontIcon from 'react-md/lib/FontIcons';
import Avatar from 'react-md/lib/Avatars';
import ListItem from 'react-md/lib/Lists/ListItem';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import Paper from 'react-md/lib/Papers';

import RouterContainer from './RouteContainer';

import * as authActions from '../redux/actions/authActions';
import localdb from '../../helpers/localdb';
import randomImage from '../../helpers/randomImage';

const avatarSrc = randomImage();

class Index extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
		  visible: false,
      dialog: null,
      key: 'inbox',
      user: {
		    first_name: "",
        last_name: ""
      }
		};
		this._handleUserChange = this._handleUserChange.bind(this);
		this.handleLogout      = this.handleLogout.bind(this);

	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.dialog && !prevState.dialog) {
			this._timeout = setTimeout(() => {
				this._timeout = null;

				this.state.dialog.querySelector('.md-btn').focus();
			}, 300);
		}
	}

	componentWillReceiveProps(nextProps) {
	  this.setState({
      user: Object.assign({}, this.state.user, nextProps.user)
    })
  }

	componentWillUnmount() {
		if (this._timeout) {
			clearTimeout(this._timeout);
		}
		this.setState({
      key: "",
      user: {}
    })
	}

  _handleUserChange() {

  }

  handleLogout() {
  	this.props.actions.clearUserDetails()
  	localdb.clear();
		this.context.router.history.push('/login');
  }

	render() {

		const { dialog, user } = this.state;
		const { navItems } = this.props;
		const _navItems = navItems;
		let drawerHeaderChildren = [
			<Avatar
				key={avatarSrc}
				src={avatarSrc}
				role="presentation"
				iconSized
				style={{ alignSelf: 'center', marginLeft: 16, marginRight: 16, flexShrink: 0 }}
			/>,
			<SelectField
				id="account-switcher"
				value={user.first_name}
        onChange={this._handleUserChange}
				menuItems={[user.first_name]}
				key="account-switcher"
				position={SelectField.Positions.BELOW}
				className="md-select-field--toolbar"
			/>,
		];

		const moreButton = (
			<MenuButton
				id="vert-menu"
				icon
				buttonChildren="more_vert"
				className="menu-example"
				tooltipLabel="Open some menu"
			>
				<ListItem primaryText="Settings" rightIcon={<FontIcon>settings</FontIcon>} />
				<ListItem primaryText="Logout" onClick={this.handleLogout} rightIcon={<FontIcon>power_settings_new</FontIcon>} />
			</MenuButton>
		);

		return (
			<div>
				<NavigationDrawer
					navItems={_navItems}
					renderNode={dialog}
					contentClassName="md-grid"
					drawerHeaderChildren={drawerHeaderChildren}
          mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          desktopDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
					toolbarTitle="MDApp"
					toolbarActions={moreButton}
          toolbarProminentTitle={false}
					contentId="main-content-demo"
				>
					<Paper
						zDepth={1}
						raiseOnHover={false}
						className='md-card md-cell md-cell--12'
						>
            <RouterContainer path={this.props.match.path} />
					</Paper>
				</NavigationDrawer>
			</div>
		);
	}
}

Index.contextTypes = {
	router: PropTypes.object.isRequired
};

Index.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
