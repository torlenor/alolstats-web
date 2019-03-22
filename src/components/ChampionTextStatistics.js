import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { TableCell } from './ThemedTableCell';

let id = 0;
function createData(name, value) {
  id += 1;
  return { id, name, value };
}

class ChampionTextStatistics extends Component {
    render() {
        const {championStats, role} = this.props;

        var rows = [];

        if (role !== undefined) {
        rows = [
            createData('Sample Size', championStats.samplesize + " Games"),
            createData('Win Rate', (100.0*championStats.winrate).toFixed(2) + " %"),
            createData('Average Kills', championStats.averagekills.toFixed(2) + " ± " + championStats.stddevkills.toFixed(2)),
            createData('Median Kills', championStats.mediankills),
            createData('Average Deaths', championStats.averagedeaths.toFixed(2) + " ± " + championStats.stddevdeaths.toFixed(2)),
            createData('Median Deaths', championStats.mediandeaths),
            createData('Average Assists', championStats.averageassists.toFixed(2) + " ± " + championStats.stddevassists.toFixed(2)),
            createData('Median Assists', championStats.medianassists),
            createData('Average Gold Earned', championStats.average_goldearned.toFixed(0) + " ± " + championStats.stddev_goldearned.toFixed(0)),
            createData('Average Minions Killed', championStats.average_totalminionskilled.toFixed(2) + " ± " + championStats.stddev_totalminionskilled.toFixed(2)),
            createData('Average Total Damage Dealt', championStats.average_totaldamagedealt.toFixed(0) + " ± " + championStats.stddev_totaldamagedealt.toFixed(0)),
            createData('Average Total Damage Taken', championStats.average_totaldamagetaken.toFixed(0) + " ± " + championStats.stddev_totaldamagetaken.toFixed(0)),
            createData('Average Heals', championStats.average_totalheal.toFixed(0) + " ± " + championStats.stddev_totalheal.toFixed(0)),
          ];
        } else {
            rows = [
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
                createData('Average Gold Earned', championStats.average_goldearned.toFixed(0) + " ± " + championStats.stddev_goldearned.toFixed(0)),
                createData('Average Minions Killed', championStats.average_totalminionskilled.toFixed(2) + " ± " + championStats.stddev_totalminionskilled.toFixed(2)),
                createData('Average Total Damage Dealt', championStats.average_totaldamagedealt.toFixed(0) + " ± " + championStats.stddev_totaldamagedealt.toFixed(0)),
                createData('Average Total Damage Taken', championStats.average_totaldamagetaken.toFixed(0) + " ± " + championStats.stddev_totaldamagetaken.toFixed(0)),
                createData('Average Heals', championStats.average_totalheal.toFixed(0) + " ± " + championStats.stddev_totalheal.toFixed(0)),
              ];
        }

        var displayRole = "";
        if (role !== undefined) {
            displayRole = role;
        } else {
            displayRole = "Overall";
        }
      
        return (
        <div>
        <Typography variant="h6" gutterBottom component="h4">
            {displayRole} Statistics
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