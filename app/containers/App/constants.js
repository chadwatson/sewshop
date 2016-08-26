exports.APP_NAME = 'SewShop';
exports.STRIPE_KEY = 'pk_test_BW7ygaqkCHyNKNtsRbN4fyGn';
exports.TOGGLE_DRAWER = 'TOGGLE_DRAWER';

exports.coolWords = [
  'Awesome!',
  'Cute!',
  'Good choice.',
];

exports.zIndexes = {
  drawer: 25,
  modal: 100,
};

exports.breakpoints = {
  base: '0px',
  mini: '480px',
  small: '600px',
  medium: '768px',
  large: '960px',
  xlarge: '1220px',
  xxlarge: '1440px',
};

exports.colors = {
  white: '#fcfcf0',
  licorice: '#37322a',
  deepSeaBlue: '#1f405f',
  norwegianBlue: '#526d92',
  alluringAqua: '#57cedf',
  mintLeaf: '#2abe88',
  magicalForest: '#338d4e',
  pistachioIceCream: '#bedc99',
  mellowYellow: '#dcde35',
  georgiaPeach: '#fba05f',
  blushingBride: '#e1ae9d',
  kissMeDarling: '#dd2525',
  fieldOfLilacs: '#aa849e',
  lightGray: '#f7f7f7',
  mediumGray: '#ccc',
  textColor: '#2C3E50',
};

exports.brandColors = [
  exports.colors.alluringAqua,
  exports.colors.mellowYellow,
  exports.colors.kissMeDarling,
  exports.colors.blushingBride,
];

exports.colorSchemes = [
  fromBaseScheme(exports.brandColors),
  fromBaseScheme([
    exports.colors.blushingBride,
    exports.colors.fieldOfLilacs,
    exports.colors.deepSeaBlue,
    exports.colors.kissMeDarling,
  ]),
  fromBaseScheme([
    exports.colors.kissMeDarling,
    exports.colors.fieldOfLilacs,
    exports.colors.blushingBride,
    exports.colors.georgiaPeach,
  ]),
  fromBaseScheme([
    exports.colors.fieldOfLilacs,
    exports.colors.mellowYellow,
    exports.colors.georgiaPeach,
    exports.colors.kissMeDarling,
  ]),
  fromBaseScheme([
    exports.colors.alluringAqua,
    exports.colors.deepSeaBlue,
    exports.colors.norwegianBlue,
    exports.colors.mellowYellow,
  ]),
  fromBaseScheme([
    exports.colors.pistachioIceCream,
    exports.colors.deepSeaBlue,
    exports.colors.kissMeDarling,
    exports.colors.magicalForest,
  ]),
  fromBaseScheme([
    exports.colors.norwegianBlue,
    exports.colors.mintLeaf,
    exports.colors.kissMeDarling,
    exports.colors.mellowYellow,
  ]),
  fromBaseScheme([
    exports.colors.norwegianBlue,
    exports.colors.magicalForest,
    exports.colors.alluringAqua,
    exports.colors.pistachioIceCream,
  ]),
];

  // these are available to every css module
exports.css = {
  customProperties: {
    variables: Object.assign({}, exports.colors, {
      zDrawer: exports.zIndexes.drawer,
      zModal: exports.zIndexes.modal,
      fontSansSerif: '\'proxima-nova\', \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif',
      drawerWidth: '300px',
      cubic: 'cubic-bezier(0.63, 0.64, 0.3, 1)',
      timing: '500ms',
      timingFast: '350ms',
    }),
  },
  customMedia: {
    extensions: {
      mini: `screen and (min-width: ${exports.breakpoints.mini})`,
      small: `screen and (min-width: ${exports.breakpoints.small})`,
      medium: `screen and (min-width: ${exports.breakpoints.medium})`,
      large: `screen and (min-width: ${exports.breakpoints.large})`,
      xlarge: `screen and (min-width: ${exports.breakpoints.xlarge})`,
      xxlarge: `screen and (min-width: ${exports.breakpoints.xxlarge})`,
      'max-mini': `screen and (max-width: ${exports.breakpoints.mini})`,
      'max-small': `screen and (max-width: ${exports.breakpoints.small})`,
      'max-medium': `screen and (max-width: ${exports.breakpoints.medium})`,
      'max-large': `screen and (max-width: ${exports.breakpoints.large})`,
      'max-xlarge': `screen and (max-width: ${exports.breakpoints.xlarge})`,
      'max-xxlarge': `screen and (max-width: ${exports.breakpoints.xxlarge}`,
    },
  },
};

/**
 * Creates a color scheme object with the same background and text colors
 * @param  {Array}  accents An array of HEX values as strings
 * @return {Object}         A color scheme
 */
function fromBaseScheme(accents) {
  return {
    background: exports.colors.lightGray, // TODO: Change to white
    text: exports.colors.licorice,
    accents,
  };
}
