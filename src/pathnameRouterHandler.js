import React from 'react';
import {actions} from 'component-router';


export const pathnameRouterHandler = ({notFound}) =>
  handlers =>
    React.createClass({
      propTypes: {
        route: React.PropTypes.string.isRequired,
        params: React.PropTypes.object.isRequired
      },


      contextTypes: {
        getComponentRouterStore: React.PropTypes.func
      },


      componentDidMount() {
        Object.keys(handlers).forEach(route =>
          this.context.getComponentRouterStore().dispatch(actions.addRoute(route)));
      },


      componentWillUnmount() {
        Object.keys(handlers).forEach(route =>
          this.context.getComponentRouterStore().dispatch(actions.removeRoute(route)));
      },


      render() {
        const {route, params, ...props} = this.props;
        const currentValue = route;

        if (currentValue === undefined || !handlers.hasOwnProperty(currentValue)) {
          return notFound ? React.createElement(notFound) : null;
        }

        return React.createElement(handlers[currentValue], {route, params, ...props});
      }
    });
