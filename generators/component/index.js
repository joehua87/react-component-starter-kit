/**
 * Component Generator
 */

const componentExists = require('../utils/componentExists')

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => ['ES6 Class', 'Stateless Function'],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return componentExists(value) ? 'A component or container with this name already exists' : true
        }

        return 'The name is required'
      },
    },
    {
      type: 'confirm',
      name: 'wantCSS',
      default: true,
      message: 'Does it have styling?',
    },
    {
      type: 'confirm',
      name: 'specificCSS',
      default: false,
      message: 'Does it have specific styling?',
    },
    /*
    {
      type: 'confirm',
      name: 'wantMessages',
      default: false,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    */
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../src/components/{{properCase name}}/index.js',
        templateFile: data.type === 'ES6 Class' ? './component/es6.js.hbs' : './component/stateless.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/components/{{properCase name}}/__test__/index.test.js',
        templateFile: './component/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/stories/{{properCase name}}/index.js',
        templateFile: './component/story.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'modify',
        path: '../src/stories/index.js',
        pattern: /\/\/ Add new story here\n/gi,
        templateFile: './component/add-story.js.hbs',
      },
      {
        type: 'modify',
        path: '../src/index.js',
        pattern: /\/\/ Add new component here\n/gi,
        templateFile: './component/export.js.hbs',
      },
    ]

    // If they want a CSS file, add styles.css
    if (data.specificCSS) {
      actions.push({
        type: 'add',
        path: '../src/components/{{properCase name}}/styles.css',
        templateFile: './component/styles.css.hbs',
        abortOnFail: true,
      })
    }

    // If they want a i18n messages file
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../src/components/{{properCase name}}/messages.js',
        templateFile: './component/messages.js.hbs',
        abortOnFail: true,
      })
    }

    return actions
  },
}
