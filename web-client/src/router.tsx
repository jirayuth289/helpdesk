import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { App } from "./screens";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return <Component {...routeProps} />;
      }}
    />
  );
};

interface P {
  history: any;
}
const PublicRoutes = ({ history }: P) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Redirect
                to={{
                  pathname: "/home",
                }}
              />
            );
          }}
        />
        <PrivateRoute path="/home" component={App} />
      </div>
    </ConnectedRouter>
  );
};

export default connect()(PublicRoutes);
