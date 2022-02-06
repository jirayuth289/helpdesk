import React from "react";
import { FormattedMessage } from "react-intl";

interface propsTypes {
  id: string;
  defaultMessage?: string
}

export default function IntlMessages(props: propsTypes) {
  return <FormattedMessage id={props.id} defaultMessage={props.defaultMessage || ''} />;
}
