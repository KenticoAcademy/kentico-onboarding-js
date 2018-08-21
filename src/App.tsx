import './sticky-footer.css';
import './index.css';
import * as React from 'react';
import { List } from './containers/List';
import { AddNewItem } from './containers/AddNewItem';
import * as PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { fetchItems } from './actions';
import { IAction } from './actions/IAction';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'balloon-css/balloon.css';
import { Dispatch } from 'redux';

interface IAppDataProps {
  isFetching: boolean;
  errorMessage: string;
  dispatch: Dispatch<IAction>;
}

export class App extends React.PureComponent<IAppDataProps> {

  static displayName = 'App';

  static propTypes = {
    isFetching: PropTypes.bool,
    errorMessage: PropTypes.string,
    dispatch: PropTypes.func,
  };

  componentDidMount() {
    fetchItems(this.props.dispatch)();
  }

  render() {
    return (
      <div>
          <Alert stack={{limit: 8}} />

          <nav className="navbar navbar-default ">
              <div className="navbar-header">
                <img src="https://www.kentico.com/i/logos/kentico_rgb_small.png" height="50px" />
              </div>
              <ul className="nav navbar-nav">
                <li>&nbsp;&nbsp;</li>
                <li><p className="customLabel">Kentico Academy TODO App</p></li>
                <li><a href="https://github.com/KenticoAcademy/kentico-onboarding-js">Fork me on GitHub</a></li>
                <li><a href="#">Do nothing special</a></li>
                <li><a href="https://www.google.cz/search?q=cats&safe=active&rlz=1C1GCEA_enCZ765CZ765&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiFy5y98cPaAhUMI8AKHeS3CuoQ_AUICigB&biw=1920&bih=974">Magic</a></li>
              </ul>
          </nav>

        <div className="container justify-content-center">

          <button onClick={fetchItems(this.props.dispatch)} className="btn btn-link btn-lg">Reload items &#x21BA;</button>

            <div id="app-content pagination-centered">
              <div className="row">

                <div className="col-sm-8">{
                  this.props.errorMessage === '' ?
                    !this.props.isFetching ?
                      <div>
                        <AddNewItem />
                        <List />
                      </div> : <img src="https://media.giphy.com/media/9wbzlCmiTbIwU/giphy.gif" className="img-circle center-block catLoader" width="200px" /> :
                    <div className="alert alert-danger alert-dismissible">
                      <button onClick={fetchItems(this.props.dispatch)} className="close" data-dismiss="alert" aria-label="close">&#x21BA;</button>
                      Try again later. <strong>{this.props.errorMessage}</strong>
                    </div>}
                </div>

              </div>
            </div>
        </div>
          <footer className="footer">
            <p>&copy; 2017 Kentico software, s.r.o</p>
          </footer>
      </div>);
  };
}
