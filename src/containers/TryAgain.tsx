import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  ITryAgainCallbackProps,
  TryAgain as TryAgainComponent
} from '../components/TryAgain';
import { IAppState } from '../models/IAppState';
import { Dispatch } from 'redux';
import { IAction } from '../models/IAction';
import { clearMessage } from '../actions';

interface ITryAgainStateProps {
  readonly registeredAction: () => void;
}

interface ITryAgainDispatchPrpos {
  readonly clearMessage: () => IAction;
}

const mapStateToProps = (state: IAppState): ITryAgainStateProps => ({
  registeredAction: state.registeredAction,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>): ITryAgainDispatchPrpos => ({
  clearMessage: () => (dispatch(clearMessage())),
});

const mergeProps = (stateProps: ITryAgainStateProps, dispatchProps: ITryAgainDispatchPrpos): ITryAgainCallbackProps => ({
  retryAction: () => {
    dispatchProps.clearMessage();
    stateProps.registeredAction();
  }
});

export const TryAgain: ComponentClass = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(TryAgainComponent);
