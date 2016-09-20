import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Item, { defaultStyles } from '../index'
import styles from '../styles.css'

describe('Item', () => {
  it('Render', () => {
    const wrappedComponent = mount(<Item icon="star" tooltip="Click to start" />)
    const rootComponent = wrappedComponent.find(`.${styles.root}`)
    const rootClassName = rootComponent.prop('className')
    expect(rootClassName).to.includes(styles.root)
    expect(rootClassName).to.includes(defaultStyles.root)
  })

  it('Click', () => {
    const onClick = sinon.spy()
    const renderedComponent = mount(<Item icon="star" onClick={onClick} />)
    renderedComponent.find(`.${styles.root}`).simulate('mouseDown')
    expect(onClick).to.be.calledOnce()
  })
})
