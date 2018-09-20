import * as React from 'react';
import * as PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { IAction } from './actions/IAction';
import { Loader } from './containers/Loader';

interface IAppDataProps {
  isFetching: boolean;
  errorMessage: string;
}

export interface IAppCallbackProps {
  fetchItemsCall: () => Promise<IAction>;
}

type IAppProps = IAppDataProps & IAppCallbackProps;

export class App extends React.PureComponent<IAppProps> {

  static displayName = 'App';

  static propTypes = {
    isFetching: PropTypes.bool,
    errorMessage: PropTypes.string,
    fetchItems: PropTypes.func,
  };

  componentDidMount() {
    this.props.fetchItemsCall();
  }

  render() {
    return (
      <div>
        <Alert stack={{limit: 8}} />

        <div className="header">
          <div className="header__content">
            <div className="header__content__item"><img src="https://www.kentico.com/i/logos/kentico_rgb_small.png" height="70px" /></div>
            <div className="header__content__item"><h4>Kentico Academy TODO App</h4></div>
            <div className="header__content__item">|</div>
            <div className="header__content__item"><a href="https://github.com/KenticoAcademy/kentico-onboarding-js">Fork me on GitHub</a></div>
            <div className="header__content__item">|</div>
            <div className="header__content__item"><a href="#">Do nothing special</a></div>
            <div className="header__content__item">|</div>
            <div className="header__content__item"><a href="https://www.google.cz/search?q=cats&safe=active&rlz=1C1GCEA_enCZ765CZ765&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiFy5y98cPaAhUMI8AKHeS3CuoQ_AUICigB&biw=1920&bih=974">Magic</a></div>
          </div>
        </div>

        <div className="body__content">
          <a onClick={this.props.fetchItemsCall} className="list__external_button">Reload items &#x21BA;</a>
          <Loader />
        </div>

        <footer className="footer">
          <p>&copy; 2017 Kentico software, s.r.o</p>
        </footer>
      </div>);
  };
}
