import * as React from 'react';

interface IOwnProps {
  readonly index: number | null;
  readonly text: string;
}

export const UpdatingItem: React.StatelessComponent<IOwnProps> = (props: IOwnProps) =>
  <div className="text-warning">
    {props.index + '. ' + props.text}
    <span
      className="glyphicon glyphicon-hourglass pull-right"
      aria-hidden="true"
    >
      Updating...
    </span>
  </div>;
