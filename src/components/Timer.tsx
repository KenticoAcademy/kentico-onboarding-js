import * as React from 'react';
import * as PropTypes from 'prop-types';

import { getCurrentDateTime } from '../utils/getCurrentDateTime';

interface ITimerContext {
  readonly lastRenderTime: Time;
  readonly refreshRenderTime: () => void;
}

const defaultValue = { lastRenderTime: '0000-01-01 00:00:00', refreshRenderTime: () => null };

const Timer = React.createContext<ITimerContext>(defaultValue);

export interface ITimerProps {
  readonly children: JSX.Element;
}

export class TimerProvider extends React.PureComponent<ITimerProps, ITimerContext> {
  static displayName = 'Timer';

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  constructor(props: ITimerProps) {
    super(props);

    this.state = {
      lastRenderTime: getCurrentDateTime(),
      refreshRenderTime: this.updateRenderTime,
    };
  }

  private updateRenderTime = (): void => this.setState(() => ({ lastRenderTime: getCurrentDateTime() }));

  render(): JSX.Element {
    const { children } = this.props;

    return (
      <Timer.Provider value={this.state || defaultValue}>
        {children}
      </Timer.Provider>
    );
  }
}

export const TimerConsumer = Timer.Consumer;

