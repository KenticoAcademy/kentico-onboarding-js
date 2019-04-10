import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes);

export const Close: React.StatelessComponent = (): JSX.Element => <FontAwesomeIcon icon="times" />;
