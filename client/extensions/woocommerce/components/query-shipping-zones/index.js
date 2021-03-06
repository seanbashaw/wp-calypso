/** @format */

/**
 * External dependencies
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */
import { fetchShippingMethods } from 'woocommerce/state/sites/shipping-methods/actions';
import { fetchShippingZones } from 'woocommerce/state/sites/shipping-zones/actions';
import { areShippingZonesLoaded } from 'woocommerce/state/sites/shipping-zones/selectors';
import { areShippingMethodsLoaded } from 'woocommerce/state/sites/shipping-methods/selectors';
import { areLocationsLoaded } from 'woocommerce/state/sites/data/locations/selectors';
import { getSelectedSiteId } from 'state/ui/selectors';
import QueryLocations from 'woocommerce/components/query-locations';

class QueryShippingZones extends Component {
	fetch( siteId ) {
		this.props.actions.fetchShippingZones( siteId );
		this.props.actions.fetchShippingMethods( siteId );
	}

	componentWillMount() {
		const { siteId, loaded } = this.props;

		if ( siteId && ! loaded ) {
			this.fetch( siteId );
		}
	}

	componentWillReceiveProps( { siteId, loaded } ) {
		//site ID changed, fetch new settings
		if ( siteId !== this.props.siteId && ! loaded ) {
			this.fetch( siteId );
		}
	}

	render() {
		return <QueryLocations siteId={ this.props.siteId } />;
	}
}

QueryShippingZones.propTypes = {
	siteId: PropTypes.number,
};

export const areShippingZonesFullyLoaded = ( state, siteId = getSelectedSiteId( state ) ) => {
	return (
		areShippingMethodsLoaded( state, siteId ) &&
		areShippingZonesLoaded( state, siteId ) &&
		areLocationsLoaded( state, siteId )
	);
};

export default connect(
	( state, ownProps ) => ( {
		loaded: areShippingZonesFullyLoaded( state, ownProps.siteId ),
	} ),
	dispatch => ( {
		actions: bindActionCreators(
			{
				fetchShippingZones,
				fetchShippingMethods,
			},
			dispatch
		),
	} )
)( QueryShippingZones );
