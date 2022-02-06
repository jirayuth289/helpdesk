import React from "react";
import 'antd/dist/antd.css';
import { Provider } from "react-redux";
import IntlProvider from "./lang/intl-provider";
import getLocale from "./lang/get-locale";
import getMessages from "./lang/get-messages";
import PublicRoutes from "./router";
import { store, history } from "./reduxs/store";

class App extends React.Component {
  state = {
    locale: null,
    messages: null
  };
  async componentDidMount() {
    const locale = await getLocale();
    const messages = await getMessages(locale);
    this.setState({ locale, messages });
  }

  render() {
    const { locale, messages } = this.state;
    return (
      <IntlProvider locale={locale} messages={messages}>
        <Provider store={store}>
          <PublicRoutes history={history} />
        </Provider>
      </IntlProvider>
    );
  }
}

export default App;
