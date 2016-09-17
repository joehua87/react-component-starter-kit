// @flow

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { WithNotes } from '@kadira/storybook-addon-notes'
import Item from 'components/Item'

storiesOf('Item', module)
  .add('Normal', () => (
    <Item icon="star" tooltip="Hello" onClick={action('Click')} />
  ))
  .add('With notes', () => (
    <WithNotes notes={'This is a very simple Button and you can click on it.'}>
      <Item icon="star" tooltip="Hello" onClick={action('Click')} />
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
          Click the "?" mark at top-right to view the info.
        </p>
      </div>
    ),
  )
