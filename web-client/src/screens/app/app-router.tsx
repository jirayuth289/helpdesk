import React from "react";
import { Switch, Route } from "react-router-dom";
import { Problem, Customer, ProblemCreation, CustomerCreation } from "../";

class AppRouter extends React.Component<any, any> {
  render() {
    const { url } = this.props;

    return (
      <Switch>
        <Route exact path={`${url}`} component={Problem} />
        <Route exact path={`${url}/customer`} component={Customer} />
        <Route
          exact
          path={`${url}/new-customer`}
          component={CustomerCreation}
        />
        <Route exact path={`${url}/new-problem`} component={ProblemCreation} />
      </Switch>
    );
  }
}

export default AppRouter;
