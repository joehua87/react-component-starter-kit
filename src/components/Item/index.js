// @flow

import React from 'react'
import { themr } from 'react-css-themr'
import makeCn from 'utils/makeCn'
import styles from './styles.css'

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
  props: {
    icon: string,
    tooltip?: string,
    onClick?: () => void,
    theme: { [key: string]: string },
  };

  static defaultProps = {
    tooltip: '',
    onClick: null,
    theme: null,
  }

  render() {
    const { icon, tooltip, onClick, theme } = this.props
    return (
      <span className={theme.root} onMouseDown={onClick} title={tooltip}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }
}

export default themr('Item', defaultStyles)(Item)
