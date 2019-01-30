import * as React from 'react';
import NodeJSTimer = NodeJS.Timer;
import { TimerConsumer } from './Timer';

interface ITickingWorkerProps {
  readonly refreshRenderTime: () => void;
}

class TickingWorker extends React.PureComponent<ITickingWorkerProps> {
  interval: NodeJSTimer;

  componentDidMount(): void {
    this.interval = setInterval(this.props.refreshRenderTime, 30000);
  }

  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  render(): null {
    return null;
  }
}

export const PeriodicTicker: React.StatelessComponent = () => (
  <TimerConsumer>
    {({refreshRenderTime}) => <TickingWorker refreshRenderTime={refreshRenderTime} />}
  </TimerConsumer>
);
