import * as React from 'react';

interface ITsComponentProps {
  name: string;
}

export class TsComponent extends React.Component<ITsComponentProps, undefined> {
  render(): JSX.Element {
    return (
      <h3 className="text-danger" title="https://lingojam.com/FancyTextGenerator">
        Ⓗⓔⓛⓛⓞ ⓕⓡⓞⓜ
        <b>{this.props.name}</b> [̲̅T][̲̅y][̲̅p][̲̅e][̲̅S][̲̅c][̲̅r][̲̅i][̲̅p][̲̅t] ⓒⓞⓜⓟⓞⓝⓔⓝⓣ
      </h3>
    );
  }
}
