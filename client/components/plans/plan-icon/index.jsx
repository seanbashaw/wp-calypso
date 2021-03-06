/** @format */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { PLANS_LIST, getPlanClass } from 'lib/plans/constants';
import { isPersonalPlan, isPremiumPlan, isBusinessPlan } from 'lib/plans';

export default class PlanIcon extends Component {
	getIcon( planName ) {
		const { plan, className } = this.props;
		const planClass = getPlanClass( plan );

		return (
			<img
				src={ `/calypso/images/plans/plan-${ planName }-circle.svg` }
				className={ classNames( 'plan-icon', `plan-icon__${ planName }`, planClass, className ) }
			/>
		);
	}

	render() {
		const { plan } = this.props;
		if ( isPersonalPlan( plan ) ) {
			return this.getIcon( 'personal' );
		}

		if ( isPremiumPlan( plan ) ) {
			return this.getIcon( 'premium' );
		}

		if ( isBusinessPlan( plan ) ) {
			return this.getIcon( 'business' );
		}

		return this.getIcon( 'free' );
	}
}

PlanIcon.propTypes = {
	classNames: PropTypes.string,
	plan: PropTypes.oneOf( Object.keys( PLANS_LIST ) ).isRequired,
};
