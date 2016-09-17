// @flow

import React from 'react'
import styles from './styles.css'

export default class Item extends React.Component { // eslint-disable-line
  /*
  props: {
    icon: string,
    tooltip?: string,
    onClick?: () => void,
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
  };

  render() {
    const { icon, tooltip, onClick } = this.props
    return (
      <span className={styles.root} onMouseDown={onClick} title={tooltip}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }
}
