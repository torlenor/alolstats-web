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
            createData('Average True Damage Dealt', championStats.average_truedamagedealt.toFixed(0) + " ± " + championStats.stddev_truedamagedealt.toFixed(0)),
            createData('Average Magic Damage Dealt', championStats.average_magicdamagedealt.toFixed(0) + " ± " + championStats.stddev_magicdamagedealt.toFixed(0)),
            createData('Average Physical Damage Dealt', championStats.average_physicaldamagedealt.toFixed(0) + " ± " + championStats.stddev_physicaldamagedealt.toFixed(0)),

            createData('Average Total Damage Dealt To Champs', championStats.average_totaldamagedealttochampions.toFixed(0) + " ± " + championStats.stddev_totaldamagedealttochampions.toFixed(0)),
            createData('Average True Damage Dealt To Champs', championStats.average_truedamagedealttochampions.toFixed(0) + " ± " + championStats.stddev_truedamagedealttochampions.toFixed(0)),
            createData('Average Magic Damage Dealt To Champs', championStats.average_magicdamagedealttochampions.toFixed(0) + " ± " + championStats.stddev_magicdamagedealttochampions.toFixed(0)),
            createData('Average Physical Damage Dealt To Champs', championStats.average_physicaldamagedealttochampions.toFixed(0) + " ± " + championStats.stddev_physicaldamagedealttochampions.toFixed(0)),
            
            createData('Average Damage Dealt To Objectives', championStats.average_damagedealttoobjectives.toFixed(0) + " ± " + championStats.stddev_damagedealttoobjectives.toFixed(0)),
            createData('Average Damage Dealt To Turrets', championStats.average_damagedealttoturrets.toFixed(0) + " ± " + championStats.stddev_damagedealttoturrets.toFixed(0)),
            createData('Average Time CCing Others', championStats.average_timeccingothers.toFixed(0) + " ± " + championStats.stddev_timeccingothers.toFixed(0)),
        ];
      
        return (
        <div>
            <Typography variant="h5" gutterBottom component="h3">
            Additional Statistics for Game Version {championStats.gameversion}
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