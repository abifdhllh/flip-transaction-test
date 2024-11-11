# Flip Transaction Page

This application is made with React Native & created for interview testing purpose in Flip. Contents of this application covers transaction list & detail of customers.

## First Setup
### Installation
Install the dependencies first with

    yarn install

Then install iOS dependencies with

    npx pod-install ios

### Running
For Android

    yarn android

For iOS

    yarn ios

## Code Optimization
### List Performance
I use Shopify Flash List to replace React Native Flat List for better performance. The performance difference can be seen on their website right [here](https://shopify.github.io/flash-list/ "here").

The implementation of this Flash List thing is available in my PR right [here](https://github.com/abifdhllh/flip-transaction-test/pull/3 "here")

### Import Optimization
For import optimization I use prettier-plugin-sort-imports package for sorting import order for better readability. You can see more detail of this package right [here](https://github.com/IanVS/prettier-plugin-sort-imports "here")

The example of this optimization can be seen on `.prettierrc.js` file. 

```json
 {
  singleQuote: true,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<TYPES>^(node:)',
    '<TYPES>',
    '<TYPES>^@/(.*)$',
    '', // empty line
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
    '', // empty line
    '^@/theme(.*)$',
    '^@/hooks(.*)$',
    '^@/navigation(.*)$',
    '', // empty line
    '^@/components/atoms(.*)$',
    '^@/components/molecules(.*)$',
    '^@/components/organisms(.*)$',
    '^@/components/templates(.*)$',
    '^@/screens(.*)$',
    '', // empty line
    '^@/(.*)$',
    '', // empty line
    '^[.]', // relative imports
  ],
  importOrderTypeScriptVersion: '5.0.0',
};
```