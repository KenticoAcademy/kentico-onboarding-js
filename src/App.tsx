import * as React from 'react';
import * as PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { IAction } from './actions/IAction';
import { Loader } from './containers/Loader/Loader';
import { alertTypes } from './constants/alert/alertTypes';
import { alertMessages } from './constants/alert/alertMessages';
import { assertAlert } from './utils/assertAlert';
import { MenuItem } from './components/MenuItem';

export interface IAppDispatchProps {
  onApplicationLoad: () => Promise<IAction>;
}

export class App extends React.PureComponent<IAppDispatchProps> {

  static displayName = 'App';

  static propTypes = {
    onApplicationLoad: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    this.props.onApplicationLoad()
      .catch(() => assertAlert(alertTypes.ERROR, alertMessages.LOAD_ERROR));
  };

  render() {
    return (
      <div>
        <div className="header">
            <div className="header__content__item"><img src="https://www.kentico.com/i/logos/kentico_rgb_small.png" height="70px" /></div>
            <div className="header__content__item"><h4>Kentico Academy TODO App</h4></div>
          <MenuItem route="https://github.com/KenticoAcademy/kentico-onboarding-js" label="Fork me on GitHub"/>
          <MenuItem route="#" label="Do nothing special"/>
          <MenuItem route="https://www.google.cz/search?q=cats&safe=active&rlz=1C1GCEA_enCZ765CZ765&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiFy5y98cPaAhUMI8AKHeS3CuoQ_AUICigB&biw=1920&bih=974" label="Magic"/>
        </div>
        <Alert stack={{limit: 8}} />
        <div className="body__content">
          <a onClick={this.fetchItems} className="list__external_button">Reload items &#x21BA;</a>
          <Loader />
        </div>

        <div className="footer">
          <p>&copy; 2017 Kentico software, s.r.o</p>
        </div>
      </div>);
  };
}
