import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IKeyMap } from '../../models/IKeyMap';
import { keyMap } from '../../constants/keyMap';
import { HotKeys } from 'react-hotkeys';
import { ReactNode } from 'react';

interface IHotKeysMapDataProps {
  readonly keyMap: IKeyMap;
  readonly children?: ReactNode;
}

const HotKeysMap: React.StatelessComponent<IHotKeysMapDataProps> = (props: IHotKeysMapDataProps): JSX.Element => (
  <HotKeys keyMap={keyMap}>
    {props.children}
  </HotKeys>
);

HotKeysMap.displayName = 'HotKeysMap';

HotKeysMap.propTypes = {
  children: PropTypes.node,
  keyMap: PropTypes.object.isRequired,
};

export { HotKeysMap };

