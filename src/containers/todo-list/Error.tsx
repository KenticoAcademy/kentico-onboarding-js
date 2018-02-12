import { connect, Dispatch } from 'react-redux';
import { IAppState } from '../../models/IAppState';
import { IAction } from '../../actions/IAction';
import {
  Error,
  IErrorCallbackProps,
  IErrorDataProps
} from '../../components/todo-list/Error';
import { closeFetchError } from '../../actions/actionCreators';

const mapStateToProps = (state: IAppState): IErrorDataProps => ({
  errorMessage: state.fetchStatus.errorMessage
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IErrorCallbackProps => ({
  onErrorClose: (): IAction => dispatch(closeFetchError()),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(Error);

export { connectedComponent as Error };
