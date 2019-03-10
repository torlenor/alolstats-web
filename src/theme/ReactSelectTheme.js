const theme = {
    control: (provided, state) => ({ ...provided, color: state.isSelected ? 'red' : 'blue', backgroundColor: '#263238', minWidth: 100, boxShadow: "none",
    borderColor: '#4f5b62',
    '&:hover': {
      borderColor: 'white',
      border: '1px solid white',
    } }),
    option: (provided, state) => ({...provided, color: state.isSelected ? 'white' : 'white', backgroundColor: '#263238', height: '100%',
    '&:hover': {
        backgroundColor: '#263238',
    }}),
    container: (provided, state)  => ({...provided, color: state.isSelected ? 'red' : 'blue', backgroundColor: 'white',}),
    placeholder:  styles => ({...styles, color: 'white'}),
    singleValue: styles => ({...styles, color: 'white',
    '&:hover': {
      borderColor: 'white',
      border: '1px solid white',
    }}),
    input: base => ({
      ...base,
      minWidth: 100,
      textAlign: "left",
      color: 'white',
      '& input': {
        font: 'inherit',
        color: 'white',
      },
    }),
  };

export default theme;
