import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

let id = 0;
function createData(name, value) {
  id += 1;
  return { id, name, value };
}

class ChampionTextStatistics extends Component {
    render() {
        const {championStats} = this.props;

        const rows = [
            createData('Sample Size', championStats.samplesize + " Games"),
            createData('Win Rate', (100.0*championStats.winrate).toFixed(2) + " %"),
            createData('Pick Rate', (100.0*championStats.pickrate).toFixed(2) + " %"),
            createData('Ban Rate', (100.0*championStats.banrate).toFixed(2) + " %"),
            createData('Average Kills', championStats.averagekills.toFixed(2) + " ± " + championStats.stddevkills.toFixed(2)),
            createData('Median Kills', championStats.mediankills),
            createData('Average Deaths', championStats.averagedeaths.toFixed(2) + " ± " + championStats.stddevdeaths.toFixed(2)),
            createData('Median Deaths', championStats.mediandeaths),
            createData('Average Assists', championStats.averageassists.toFixed(2) + " ± " + championStats.stddevassists.toFixed(2)),
            createData('Median Assists', championStats.medianassists),
          ];
      
        return (
        <div>
            <Typography variant="h5" gutterBottom component="h3">
            Overall Statistics for Game Version {championStats.gameversion}
          </Typography>

          <Table>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

          </div>
        )
    }
}

export default ChampionTextStatistics;