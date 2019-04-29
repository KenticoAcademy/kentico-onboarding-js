import * as React from 'react';
import { TimerConsumer } from './Timer';
import { List } from '../containers/List';


export const ListWithTimer: React.FunctionComponent = () => (
  <TimerConsumer>
    {({ lastRenderTime, refreshRenderTime }) => (
      <List
        lastRenderTime={lastRenderTime}
        onPropsChanged={refreshRenderTime}
      />
    )}
  </TimerConsumer>
);
