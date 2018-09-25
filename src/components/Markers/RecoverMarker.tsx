import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IAction } from '../../actions/IAction';

interface IRecoverMarkerDataProps {
  onRecover: () => Promise<IAction>;
}

const RecoverMarker: React.StatelessComponent<IRecoverMarkerDataProps> = ({onRecover}) =>
  (
    <div
      data-balloon={'Recover item'}
      data-balloon-pos="up"
      className="list__item__inline_content"
      onClick={onRecover}>
      ♻
    </div>);


RecoverMarker.displayName = 'RecoverMarker';


RecoverMarker.propTypes = {
  onRecover: PropTypes.func.isRequired,
};

export { RecoverMarker };
