import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import TextField from '@material-ui/core/TextField';

import Icon from '@material-ui/core/Icon';

import { Link } from 'react-router-dom'

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Champion' },
  { id: 'roles', numeric: false, disablePadding: true, label: 'Roles' },
  { id: 'sampleSize', numeric: true, disablePadding: false, label: 'Sample Size' },
  { id: 'winRate', numeric: true, disablePadding: false, label: 'Win Rate [%]' },
  { id: 'pickRate', numeric: true, disablePadding: false, label: 'Pick Rate [%]' },
  { id: 'banRate', numeric: true, disablePadding: false, label: 'Ban Rate [%]' },
  { id: 'averageKills', numeric: true, disablePadding: false, label: 'Avg Kills' },
  { id: 'averageDeaths', numeric: true, disablePadding: false, label: 'Avg Deaths' },
  { id: 'averageAssists', numeric: true, disablePadding: false, label: 'Avg Assists' },
];

function toLower(item) {
    return item.toLowerCase();
}

function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          /> */}
        </TableCell>
        {rows.map(
          row => (
            <TableCell
              key={row.id}
              numeric={row.numeric}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === row.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ),
          this,
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingRight: 10,
  },
  spacer: {
    flex: '1 1 100%',
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, gameVersion } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Champions Summary for Game Version {gameVersion}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Compare">
            <IconButton aria-label="Compare">
              <Icon>compare</Icon>
              Compare
            </IconButton>
          </Tooltip>
        ) : (
          <div></div>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: 5 * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

function EnhancedTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [data, setData] = React.useState(props.data);
    const [filteredData, setFilteredData] = React.useState(props.data);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filterText, setFilterText] = React.useState("");

    React.useEffect(() => {
        setFilteredData(props.data);
        setData(props.data);
        setRowsPerPage(props.data.length);
        changeFilter(filterText);
    }, [props.data, filterText]);

    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    function handleSelectAllClick(event) {
        if (event.target.checked) {
        const newSelecteds = filteredData.map(n => n.id);
        setSelected(newSelecteds);
        return;
        }
        setSelected([]);
    }

    // function handleClick(event, id) {
    //     const selectedIndex = selected.indexOf(id);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //     newSelected = newSelected.concat(selected, id);
    //     } else if (selectedIndex === 0) {
    //     newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //     newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //     newSelected = newSelected.concat(
    //         selected.slice(0, selectedIndex),
    //         selected.slice(selectedIndex + 1),
    //     );
    //     }

    //     setSelected(newSelected);
    // }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }

    const isSelected = id => selected.indexOf(id) !== -1;

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    function changeFilter(newFilterText) {
        setFilterText(newFilterText)
        if (filterText.length === 0) {
            setFilteredData(data);
            return;
        }
        const filtered = data.filter(hit => {
            const roles = hit.roles.map(toLower)
            var i;
            for (i = 0; i < roles.length; i++) { 
            if (roles[i].includes(filterText)) {
                return true;
            }
            }
            return hit.key.toLowerCase().includes(filterText) === true || hit.name.toLowerCase().includes(filterText) === true ;
        }
        );
        setFilteredData(filtered);
    }

    function handleChangeFilter (event) {
        changeFilter(event.target.value.toLowerCase())
    };

    function renderRoles(roles) {
        var rolesStr = ""
        roles.forEach( value => {
            rolesStr += value + " ";
        });
        return rolesStr;
    }

    return (
        <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} 
                gameVersion={props.gameVersion} />
        <div style={{margin: 5,}}>
            <TextField
                id="outlined-full-width"
                label="Filter"
                autoComplete='off'
                placeholder="Enter name or role"
                fullWidth
                autoFocus
                onChange={handleChangeFilter}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
            />
        </div>
        <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={filteredData.length}
            />
            <TableBody>
                {stableSort(filteredData, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                    const isItemSelected = isSelected(n.id);
                    return (
                    <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isItemSelected}
                    >
                        <TableCell padding="checkbox">
                        {/* <Checkbox 
                            checked={isItemSelected}
                            onClick={event => handleClick(event, n.id)}
                        /> */}
                        </TableCell>
                        <TableCell scope="row" padding="none" component={props => <Link to={`/champions/${n.key}`} {...props}/>}>
                            <p><img src={`https://ddragon.leagueoflegends.com/cdn/9.4.1/img/champion/${n.key}.png`} height={32}  style={{float: "left",}} alt="Logo" />
                            {n.name}</p>
                        </TableCell>
                        <TableCell padding="none">{renderRoles(n.roles)}</TableCell>
                        <TableCell numeric>{n.sampleSize}</TableCell>
                        <TableCell numeric>{n.winRate}</TableCell>
                        <TableCell numeric>{n.pickRate}</TableCell>
                        <TableCell numeric>{n.banRate}</TableCell>
                        <TableCell numeric>{n.averageKills}</TableCell>
                        <TableCell numeric>{n.averageDeaths}</TableCell>
                        <TableCell numeric>{n.averageAssists}</TableCell>
                    </TableRow>
                    );
                })}
                {/* {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={9} />
                </TableRow>
                )} */}
            </TableBody>
            </Table>
        </div>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, filteredData.length]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
            'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
            'aria-label': 'Next Page',
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Paper>
    );
}

export default EnhancedTable;