// @flow

import React from 'react'
import styles from './styles.css'
import { themr } from 'react-css-themr'
import makeCn, { getThemingOption } from 'utils/makeCn'

const cn = makeCn({ _: styles })

/*
 * -pc from virtualClass to set color to primary-color
 * _root from styles.css to set cursor & hover
 * dib ba b--gray from tachyons.css to set display: inline-block & border
 */
export const defaultStyles = {
  root: cn('_root -pc dib ba b--gray'),
}

export class Item extends React.Component { // eslint-disable-line
  /*
  props: {
    icon: string,
    tooltip?: string,
    onClick?: () => void,
    theme: { [key: string]: string },
  };
  */

  /*
  Use this for showing info in storybook.
  Currently @kadira/react-storybook-addon-info is not support flow type
  */
  static propTypes = {
    icon: React.PropTypes.string.isRequired,
    tooltip: React.PropTypes.string,
    onClick: React.PropTypes.func,
    theme: React.PropTypes.object,
  };

  render() {
    const { icon, tooltip, onClick, theme } = this.props
    return (
      <span className={theme.root} onMouseDown={onClick} title={tooltip}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }
}

export default themr('Item', defaultStyles, getThemingOption())(Item)
