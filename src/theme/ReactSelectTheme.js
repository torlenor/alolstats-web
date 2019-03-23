import muiTheme from './MuiTheme';

const theme = {
    control: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'red' : 'blue', backgroundColor: muiTheme.palette.primary.main, minWidth: 100, boxShadow: state.isFocused ? null : null,
    borderColor: muiTheme.palette.text.primary,
    '&:hover': {
      borderColor: muiTheme.palette.text.primary,
      border: '1px solid white',
    } }),
    option: (provided, state) => ({
        ...provided,
        fontSize: muiTheme.typography.fontSize+2,
        color: state.isSelected ? muiTheme.palette.text.primary : muiTheme.palette.text.primary,
        backgroundColor: muiTheme.palette.background.paper,
        height: '100%',
        '&:hover': {
            backgroundColor: muiTheme.palette.background.default,
        }
    }),
    container: (provided, state)  => ({...provided, color: state.isSelected ? 'red' : 'blue', backgroundColor: muiTheme.palette.background.paper,}),
    menuPortal: (provided, state)  => ({...provided, color: state.isSelected ? 'red' : 'blue', backgroundColor: muiTheme.palette.background.paper,}),
    placeholder:  styles => ({
        ...styles,
        fontSize: muiTheme.typography.fontSize+2,
        color: muiTheme.palette.text.primary
    }),
    dropdownIndicator: styles => ({...styles, color: muiTheme.palette.text.primary}),
    singleValue: styles => ({...styles, color: muiTheme.palette.text.primary,
    '&:hover': {
      borderColor: muiTheme.palette.text.primary,
      border: `1px solid ${muiTheme.palette.text.primary}`,
    }}),
    menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0
      }),
      menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
      }),
    input: base => ({
      ...base,
      minWidth: 100,
      textAlign: "left",
      color: muiTheme.palette.text.primary,
      '& input': {
        font: 'inherit',
        color: muiTheme.palette.text.primary,
      },
      fontSize: muiTheme.typography.fontSize+2,
    }),
  };

export default theme;
