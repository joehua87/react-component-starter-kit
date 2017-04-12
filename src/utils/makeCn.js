// @flow

import _classnames from 'classnames'
import styles from 'theme/virtual.css'

const prefixKeys = (obj, prefix = '-') => {
  const keys = Object.keys(obj)
  const result = {}
  keys.forEach(key => (result[`${prefix}${key}`] = obj[key]))
  return result
}

// Add virtual class name here
// Virtual classes should be prefixed with a hyphen
// One virtual class can reference another virtual class
const virtualToFunctional = prefixKeys(styles)

// Convert virtual class names to functional class names
const convertVirtualClassnames = classNames => classNames.split(' ').map(className => (
  // Recursively convert.
  // Also return both functional and virtual classes
  virtualToFunctional[className]
  ? `${convertVirtualClassnames(virtualToFunctional[className])} ${className}`
  : className
)).join(' ')

// Convert prefixed CSS-Module class names to CSS-Module class names
const convertCssModuleClassnames = prefixToCssmodules => classNames => (
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
const makeCn = (prefixToCssmodules: any) => (...args: any) => (
  // First run classnames, then run convertVirtualClassnames,
  // then pass the result to convertCssModuleClassnames
  convertCssModuleClassnames(prefixToCssmodules)(convertVirtualClassnames(_classnames(...args)))
)

export default makeCn
