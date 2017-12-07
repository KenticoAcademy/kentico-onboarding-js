import * as React from 'react';

interface ITsComponentProps {
  name: string;
}

export const TsComponent: React.StatelessComponent<ITsComponentProps> = ({ name }) => (
  <h3 className="text-danger" title="https://lingojam.com/FancyTextGenerator">
    Ⓗⓔⓛⓛⓞ ⓕⓡⓞⓜ
    <b>{name}</b> [̲̅T][̲̅y][̲̅p][̲̅e][̲̅S][̲̅c][̲̅r][̲̅i][̲̅p][̲̅t] ⓒⓞⓜⓟⓞⓝⓔⓝⓣ
  </h3>
);
