import _classnames from 'classnames'
import styles from 'theme/virtual.css'

const prefixKeys = (obj, prefix = '-') => {
  const keys = Object.keys(obj)
  const result = {}
  keys.forEach((key) => (result[`${prefix}${key}`] = obj[key]))
  return result
}

// Add virtual class name here
// Virtual classes should be prefixed with a hyphen
// One virtual class can reference another virtual class
let virtualToFunctional = prefixKeys(styles)

/*
type ThemingOption = {
  composeTheme: 'deeply' | 'softly' | false,
  withRef?: boolean,
}
*/

let _options = {
  composeTheme: false,
}

export const setThemingOption = (options) => {
  _options = options
}

export const getThemingOption = () => _options

// Convert virtual class names to functional class names
const convertVirtualClassnames = (classNames) => classNames.split(' ').map((className) => (
  // Recursively convert.
  // Also return both functional and virtual classes
  virtualToFunctional[className]
  ? `${convertVirtualClassnames(virtualToFunctional[className])} ${className}`
  : className
)).join(' ')

// Convert prefixed CSS-Module class names to CSS-Module class names
const convertCssModuleClassnames = (prefixToCssmodules) => (classNames) => (
  // Only proceed if prefixToCssmodules is not empty/undefined.
  // Otherwise, just return classNames (else case)
  prefixToCssmodules
  ? classNames.split(' ').map((className) => { // For each class name...
    let convertedClassname

    // For each prefix (like "h_" or "f_")...
    Object.keys(prefixToCssmodules).forEach((prefix) => {
      // Test to see if the prefix matches the class name
      const regexp = new RegExp(`^${prefix}`)
      if (regexp.test(className)) {
        // If it matches, get the CSS module object
        // by calling prefixToCssmodules[prefix],
        // then look up the className (without the prefix)
        convertedClassname = prefixToCssmodules[prefix][className.replace(regexp, '')]
      }
    })

    // If successfully converted, return both the CSS module version
    // and the pre-conversion version (for in-browser debugging).
    return convertedClassname ? `${convertedClassname} ${className}` : className
  }).join(' ')
  : classNames
)

// Wrap classnames function with convertVirtualClassnames and convertCssModuleClassnames
const makeCn = (prefixToCssmodules) => (...args) => (
  // First run classnames, then run convertVirtualClassnames,
  // then pass the result to convertCssModuleClassnames
  convertCssModuleClassnames(prefixToCssmodules)(convertVirtualClassnames(_classnames(...args)))
)

/*
 * Use this to set virtualStyles from project that use this library
 */
export function setVirtualStyles(virtualStyles) {
  virtualToFunctional = virtualStyles
}

export default makeCn
