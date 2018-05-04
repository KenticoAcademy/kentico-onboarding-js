import * as React from 'react';
import '../../styles/loader.css';

interface ILoadingPageDataProps {
  readonly message: string;
}

const Loader: React.StatelessComponent<ILoadingPageDataProps> = (props: ILoadingPageDataProps): JSX.Element => (
  <div>
    <p className="info-text">{props.message}</p>
    <div className="loader" />
  </div>
);

Loader.displayName = 'Loader';

export { Loader };
