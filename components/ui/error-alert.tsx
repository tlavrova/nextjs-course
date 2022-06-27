import classes from './error-alert.module.css';
import React from "react";

function ErrorAlert(props: {children: React.ReactNode}) {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
