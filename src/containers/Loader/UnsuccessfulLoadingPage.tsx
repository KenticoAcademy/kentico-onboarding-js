import { connect } from 'react-redux';
import { IAppState } from '../../reducers/IAppState';
import {
  IUnsuccessfulLoadingPageStateProps,
  UnsuccessfulLoadingPage as UnsuccessfulLoadingPageComponent,
} from '../../components/Loader/UnsuccessfulLoadingPage';


const mapStateToProps = ({items}: IAppState): IUnsuccessfulLoadingPageStateProps => ({
  errorMessage: items.status.errorMessage,
});

export const UnsuccessfulLoadingPage = connect(mapStateToProps)(UnsuccessfulLoadingPageComponent);
