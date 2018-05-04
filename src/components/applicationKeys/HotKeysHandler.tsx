import * as React from 'react';
import * as PropTypes from 'prop-types';
import { KeyMapHandlers } from '../../models/IKeyMap';
import { HotKeys } from 'react-hotkeys';
import { ReactNode } from 'react';

interface IHotKeysHandlerDataProps {
  readonly handlers: KeyMapHandlers;
  readonly children?: ReactNode;
}

const HotKeysHandler: React.StatelessComponent<IHotKeysHandlerDataProps> = (props: IHotKeysHandlerDataProps): JSX.Element => (
  <HotKeys handlers={props.handlers}>
    {props.children}
  </HotKeys>
);

HotKeysHandler.displayName = 'HotKeysHandler';

HotKeysHandler.propTypes = {
  children: PropTypes.node,
  handlers: PropTypes.object.isRequired,
};

export { HotKeysHandler };

