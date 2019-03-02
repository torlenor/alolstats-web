import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

let id = 0;
function createData(name, avgValue1, stddevValue1, avgValue2, stddevValue2, unit, prec) {
    id += 1;
    let color1 = "";
    let color2 = "";
    let diff = "-";
    let value1 = "";
    let value2 = "";
    if (stddevValue1 !== null && stddevValue1 !== undefined) {
        value1 = avgValue1 + " ± " + stddevValue1;
    } else {
        value1 = avgValue1;
    }
    if (stddevValue2 !== null && stddevValue2 !== undefined) {
        value2 = avgValue2 + " ± " + stddevValue2;
    } else {
        value2 = avgValue2;
    }
    let diffVal = ( parseFloat(avgValue2) - parseFloat(avgValue1) );
    if (unit !== null && unit !== undefined) {
        value1 = value1 + " " + unit;
        value2 = value2 + " " + unit;
        diff = diff + " " + unit;
    }
    if (diffVal < 0) {
        color1 = "green";
        color2 = "red";
    } else if (diffVal === 0) {
        color1 = "green";
        color2 = "green";
    } else {
        color1 = "red";
        color2 = "green";
    }
    diff = diffVal.toFixed(prec);
    return { id, name, value1, value2, color1, color2, diff};
}

class ChampionComparisonTextStatistics extends Component {
    render() {
        const {championStats1, championStats2} = this.props;

        const rows = [
            createData('Sample Size', championStats1.samplesize, null, championStats2.samplesize, null, "Games", 0),
            createData('Win Rate', (100.0*championStats1.winrate).toFixed(2), null, (100.0*championStats2.winrate).toFixed(2), null, "%", 2),
            createData('Pick Rate', (100.0*championStats1.pickrate).toFixed(2), null, (100.0*championStats2.pickrate).toFixed(2), null, "%", 2),
            createData('Ban Rate', (100.0*championStats1.banrate).toFixed(2), null, (100.0*championStats2.banrate).toFixed(2), null, "%", 2),
            createData('Average Kills', championStats1.averagekills.toFixed(2), championStats1.stddevkills.toFixed(2),
                                        championStats2.averagekills.toFixed(2), championStats2.stddevkills.toFixed(2), "", 2
                                        ),
            createData('Median Kills', championStats1.mediankills, null, championStats2.mediankills, null, "", 0),
            createData('Average Deaths', championStats1.averagedeaths.toFixed(2), championStats1.stddevdeaths.toFixed(2),
                                         championStats2.averagedeaths.toFixed(2), championStats2.stddevdeaths.toFixed(2), "", 2
                                         ),
            createData('Median Deaths', championStats1.mediandeaths, null, championStats2.mediandeaths, null, "", 0),
            createData('Average Assists', championStats1.averageassists.toFixed(2), championStats1.stddevassists.toFixed(2),
                                          championStats2.averageassists.toFixed(2), championStats2.stddevassists.toFixed(2), "", 2
                                          ),
            createData('Median Assists', championStats1.medianassists, null, championStats2.medianassists, null, "", 0),
            createData('Average Gold Earned', championStats1.average_goldearned.toFixed(0), championStats1.stddev_goldearned.toFixed(0),
                                              championStats2.average_goldearned.toFixed(0), championStats2.stddev_goldearned.toFixed(0), "", 0
                                              ),
            createData('Average Minions Killed', championStats1.average_totalminionskilled.toFixed(2), championStats1.stddev_totalminionskilled.toFixed(2),
                                                 championStats2.average_totalminionskilled.toFixed(2), championStats2.stddev_totalminionskilled.toFixed(2), "", 2
                                                 ),
            createData('Average Total Damage Dealt', championStats1.average_totaldamagedealt.toFixed(0), championStats1.stddev_totaldamagedealt.toFixed(0),
                                                     championStats2.average_totaldamagedealt.toFixed(0), championStats2.stddev_totaldamagedealt.toFixed(0), "", 0
                                                     ),
            createData('Average Total Damage Taken', championStats1.average_totaldamagetaken.toFixed(0), championStats1.stddev_totaldamagetaken.toFixed(0),
                                                     championStats2.average_totaldamagetaken.toFixed(0), championStats2.stddev_totaldamagetaken.toFixed(0), "", 0
                                                     ),
            createData('Average Heals', championStats1.average_totalheal.toFixed(0), championStats1.stddev_totalheal.toFixed(0),
                                        championStats2.average_totalheal.toFixed(0), championStats2.stddev_totalheal.toFixed(0), "", 0
                                        ),
          ];
      
        return (
        <div>
            <Typography variant="h5" gutterBottom component="h3">
            Comparison for Game Version {championStats1.gameversion}
          </Typography>
          <Table>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right">{championStats1.championname}</TableCell>
                    <TableCell align="right">{championStats2.championname}</TableCell>
                    <TableCell align="right">Diff (Mean)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {rows.map(row => (
                <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right" style={{color: `${row.color1}`,}}>{row.value1}</TableCell>
                <TableCell align="right" style={{color: `${row.color2}`,}}>{row.value2}</TableCell>
                <TableCell align="right">{row.diff}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>

          </div>
        )
    }
}

export default ChampionComparisonTextStatistics;