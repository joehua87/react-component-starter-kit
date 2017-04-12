// @flow

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { WithNotes } from '@kadira/storybook-addon-notes'
import Item from 'components/Item'

const theme = {
  root: 'pa4 b--gray shadow-4',
}

storiesOf('Item', module)
  .add('Normal', () => (
    <Item icon="star" tooltip="Hello" onClick={action('Click')} />
  ))
  .add('Override theme', () => (
    <WithNotes notes={'Override Item theme by changing it padding & adding shadow'}>
      <Item icon="star" theme={theme} tooltip="Hello" onClick={action('Click')} />
    </WithNotes>
  ))
  .addWithInfo(
    'With Info',
    `
      This is the basic usage with the button with providing a label to show the text.
    `,
    () => (
      <div>
        <Item icon="star" tooltip="Hello" onClick={action('Click')} />
        <br />
        <p>
          {'Click the "?" mark at top-right to view the info.'}
        </p>
      </div>
    ),
  )
