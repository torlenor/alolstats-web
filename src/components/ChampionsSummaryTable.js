import React from 'react';

import { Link } from 'react-router-dom'

import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material UI
import { makeStyles } from '@material-ui/styles';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

// Material UI Components for Champion selecting/comparing
import Checkbox from '@material-ui/core/Checkbox';

// Own Components
// import Progress from './Progress'
import { TableCell } from './ThemedTableCell';
import { numberWithCommas } from '../utils/numberMods'

const MAX_SELECTED = 2;

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
  const { onClearAllClick, order, orderBy, numSelected, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          { numSelected > 0 ?
            <Tooltip title="Unselect All">
          <IconButton aria-label="UnselectAll" onClick={onClearAllClick}>
              <Icon color="primary">clear</Icon>
            </IconButton>
            </Tooltip>
            : <div></div> }
        </TableCell>
        {rows.map(
          row => (
            <TableCell
              key={row.id}
              align={row.numeric ? 'right' : 'inherit'}
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
  const { numSelected, isUpdating, onHandleCompareClick } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
            <div>
          <Typography style={{display: 'inline-block'}} variant="h5" id="tableTitle">
            Champions Summary
          </Typography>
          <Typography  variant="subtitle1">
            {numSelected} selected
          </Typography>
          </div>
        ) : (
           <div>
          <Typography style={{display: 'inline-block'}} variant="h5" id="tableTitle">
            Champions Summary
          </Typography>
          <Typography variant="subtitle1">
            Select {MAX_SELECTED} Champions for comparison
          </Typography>
          </div>
        )}
        {/* {isUpdating === true ? (<Progress size={30}/>) : (<div></div>)} */}
      </div>
      <div className={classes.spacer} />
      <div>
        {numSelected === MAX_SELECTED ? (
          <Tooltip title="Compare" style={{display: 'inline-block'}}>
            <IconButton aria-label="Compare" style={{display: 'inline-block'}} onClick={onHandleCompareClick}>
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

    let selected, setSelected, order, setOrder, orderBy, setOrderBy, filterText, setFilterText;
    if (props.cookies !== undefined && props.cookies !== null) {
        [selected, setSelected] = React.useState(props.cookies.get('summarySelected') || []);
        [order, setOrder] = React.useState(props.cookies.get('summaryOrder') || 'asc');
        [orderBy, setOrderBy] = React.useState(props.cookies.get('summaryOrderBy') || 'name');
        [filterText, setFilterText] = React.useState(props.cookies.get('summaryFilterText') || "");
    }
    const [data, setData] = React.useState(props.data);
    const [filteredData, setFilteredData] = React.useState(props.data);
    
    React.useEffect(() => {
        setFilteredData(props.data);
        setData(props.data);
        changeFilter(filterText, props.data);
    }, [props.data, filterText]);

    React.useEffect(() => {
        changeFilter(filterText, props.data);
    }, [selected]);

    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
        if (props.cookies !== undefined && props.cookies !== null) {
            props.cookies.set('summaryOrder', isDesc ? 'asc' : 'desc', { path: '/' });
            props.cookies.set('summaryOrderBy', property, { path: '/' });
        }
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = filteredData.map(n => n.key);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    function handleClearAllClick(event) {
        if (props.cookies !== undefined && props.cookies !== null) {
            props.cookies.set('summarySelected', [], { path: '/' });
        }
        setSelected([]);
    }

    function handleCompareClick(event) {
        if (selected.length === MAX_SELECTED) {
            const sortedSelected = selected.sort();
            props.routerHistory.push('/championcomparison/' + sortedSelected[0] + '/' + sortedSelected[1]);
        } else {
            console.log("Error in compare click logic, not doing anything");
        }
    }

    function handleClick(event, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1 && selected.length < MAX_SELECTED) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        } else {
            return;
        }

        if (props.cookies !== undefined && props.cookies !== null) {
            props.cookies.set('summarySelected', newSelected, { path: '/' });
        }
        setSelected(newSelected);
    }

    const isSelected = id => selected.indexOf(id) !== -1;

    function changeFilter(newFilterText, data) {
        setFilterText(newFilterText)
        props.cookies.set('summaryFilterText', newFilterText, { path: '/' });
        if (filterText.length === 0) {
            setFilteredData(data);
            return;
        }
        const filtered = data.filter(hit => {
            if (hit.roles != null) {
                const roles = hit.roles.map(toLower);
                var i;
                for (i = 0; i < roles.length; i++) {
                    if (roles[i].includes(filterText)) {
                        return true;
                    }
                }
            }
            return hit.key.toLowerCase().includes(filterText) === true || hit.name.toLowerCase().includes(filterText) === true || selected.includes(hit.key);
        }
        );
        setFilteredData(filtered);
    }

    function handleChangeFilter (event) {
        changeFilter(event.target.value.toLowerCase(), data)
    };

    function renderRoles(roles) {
        var rolesStr = ""
        if (roles != null) {
            roles.forEach( value => {
                rolesStr += value + " ";
            });
        }
        return rolesStr;
    }

    return (
        <Paper className={classes.root}>
        <EnhancedTableToolbar 
            numSelected={selected.length} 
            gameVersion={props.gameVersion}
            isUpdating={props.isUpdating}
            onHandleCompareClick={handleCompareClick}/>
        <div style={{margin: 5,}}>
            <TextField
                id="outlined-full-width"
                label="Filter"
                autoComplete='off'
                placeholder="Enter name or role"
                fullWidth
                autoFocus
                value={filterText}
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
                onClearAllClick={handleClearAllClick}
            />
            <TableBody>
                {stableSort(filteredData, getSorting(order, orderBy))
                .map(n => {
                    const isItemSelected = isSelected(n.key);
                    return (
                    <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={n.key}
                        selected={isItemSelected}
                    >
                        <TableCell padding="checkbox">
                        <Checkbox 
                            checked={isItemSelected}
                            onClick={event => handleClick(event, n.key)}
                        />
                        </TableCell>
                        <TableCell scope="row" padding="none" style={{ "textDecoration": "none", "justifyContent": "left", "alignItems": "center", "textAlign": "left",}} component={props => <Link to={`/champions/${n.key}`} {...props}/>}>
                            <div style={{ "justifyContent": "left", "alignItems": "center", "textAlign": "left", display: 'flex', flexDirection: 'row',}}>
                                <img src={`https://ddragon.leagueoflegends.com/cdn/9.5.1/img/champion/${n.key}.png`} height={32} width={32} style={{justify: "left",}} alt="Logo" />
                                <Typography component={'span'} style={{"textDecoration": "none",  "marginLeft": 4}}>
                                    {n.name}
                                </Typography>
                            </div>
                        </TableCell>
                        <TableCell padding="none">{renderRoles(n.roles)}</TableCell>
                        <TableCell align="right">{numberWithCommas(n.sampleSize)}</TableCell>
                        <TableCell align="right">{n.winRate}</TableCell>
                        <TableCell align="right">{n.pickRate}</TableCell>
                        <TableCell align="right">{n.banRate}</TableCell>
                        <TableCell align="right">{n.averageKills}</TableCell>
                        <TableCell align="right">{n.averageDeaths}</TableCell>
                        <TableCell align="right">{n.averageAssists}</TableCell>
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </div>
        </Paper>
    );
}

export default EnhancedTable;
