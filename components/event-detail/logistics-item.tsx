import classes from './logistics-item.module.css';
import React from "react";

function LogisticsItem(props: {children: React.ReactNode, // @ts-ignore
    icon: Icon}) {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
