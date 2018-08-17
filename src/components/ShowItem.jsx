import React from 'react';

export function ShowItem(props) {
  return (
    <div
      role="presentation"
      onClick={props.handlerClick}
    >
      {props.pos + ". "}{props.text}
    </div>
  );
}
