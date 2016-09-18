// @flow

import { configure, setAddon } from '@kadira/storybook'
import infoAddon from '@kadira/react-storybook-addon-info'

/*
 * We are able to override the virtualStyles (think about overriding variables)
 * by provide the snippets below at the begining of other projects
 */

/*
import { setVirtualStyles } from 'utils/makeCn'

const virtualStyles = {
  '-pc': 'gray',
}
setVirtualStyles(virtualStyles)
*/

setAddon(infoAddon)

function loadStories() {
  require('../src/stories')
}

configure(loadStories, module)
