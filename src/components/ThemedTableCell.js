import { withStyles } from '@material-ui/core/styles';

import MuiTableCell from '@material-ui/core/TableCell';

export const TableCell = withStyles(theme => ({
    root: {
      borderBottom: `1px solid ${theme.palette.background.default}`,
    },
  }))(MuiTableCell);
