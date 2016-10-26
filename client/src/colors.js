import color from 'color'

const colors = {
  red: '#e42d40',
  yellow: '#fbc125',
  green: '#40bf20',
  white: '#ffffff',
  veryLightGray: '#ededed',
  lightGray: '#cccccc',
  gray: '#888888',
  darkGray: '#575757'
}

const brandPreferences = {
  primary: colors.red,
  fadedPrimary: color(colors.red).darken(0.5),
  warning: colors.yellow,
  success: colors.green,
  bg: colors.white,

  outline: colors.lightGray,
  placeholder: colors.veryLightGray,
  userInput: colors.darkGray
}

export default {
  ...colors,
  ...brandPreferences
}
