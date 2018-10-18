import * as React from 'react';
import * as PropTypes from 'prop-types';


export interface IMenuItemProps {
  route: string;
  label: string;
}

const MenuItem: React.StatelessComponent<IMenuItemProps> = ({route, label}) => (<div className="header__content__link">
  <a
    href={route}
  >{label}</a>
</div>);

MenuItem.propTypes = {
  route: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

MenuItem.displayName = 'MenuItem';

export {MenuItem};
