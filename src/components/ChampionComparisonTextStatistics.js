import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

import Typography from '@material-ui/core/Typography';

import { TableCell } from './ThemedTableCell';

let id = 0;
function createData(name, avgValue1, stddevValue1, avgValue2, stddevValue2, unit, prec, noColor=false, lowerIsBetter=false) {
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
    if(!noColor) {
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
        if (lowerIsBetter) {
            var tmpColor = color2;
            color2 = color1;
            color1 = tmpColor;
        }
    }
    diff = diffVal.toFixed(prec);
    return { id, name, value1, value2, color1, color2, diff};
}

class ChampionComparisonTextStatistics extends Component {
    render() {
        const {championStats1, championStats2, role, champName1, champName2} = this.props;

        var rows = [];
        if (role !== undefined) {
            rows = [
                createData('Win Rate', (100.0*championStats1.winrate).toFixed(2), null, (100.0*championStats2.winrate).toFixed(2), null, "%", 2),
                createData('Average Kills', championStats1.averagekills.toFixed(2), championStats1.stddevkills.toFixed(2),
                                            championStats2.averagekills.toFixed(2), championStats2.stddevkills.toFixed(2), "", 2
                                            ),
                createData('Average Deaths', championStats1.averagedeaths.toFixed(2), championStats1.stddevdeaths.toFixed(2),
                                            championStats2.averagedeaths.toFixed(2), championStats2.stddevdeaths.toFixed(2), "", 2, false,true
                                            ),
                createData('Average Assists', championStats1.averageassists.toFixed(2), championStats1.stddevassists.toFixed(2),
                                            championStats2.averageassists.toFixed(2), championStats2.stddevassists.toFixed(2), "", 2
                                            ),
                createData('Average Gold Earned', championStats1.average_goldearned.toFixed(0), championStats1.stddev_goldearned.toFixed(0),
                                                championStats2.average_goldearned.toFixed(0), championStats2.stddev_goldearned.toFixed(0), "", 0
                                                ),
                createData('Average Minions Killed', championStats1.average_totalminionskilled.toFixed(2), championStats1.stddev_totalminionskilled.toFixed(2),
                                                    championStats2.average_totalminionskilled.toFixed(2), championStats2.stddev_totalminionskilled.toFixed(2), "", 2
                                                    ),
                createData('Average Total Damage Dealt To Champs', championStats1.average_totaldamagedealttochampions.toFixed(0), championStats1.stddev_totaldamagedealttochampions.toFixed(0),
                                                    championStats2.average_totaldamagedealttochampions.toFixed(0), championStats2.stddev_totaldamagedealttochampions.toFixed(0), "", 0
                                                    ),
                createData('Average Total Damage Dealt', championStats1.average_totaldamagedealt.toFixed(0), championStats1.stddev_totaldamagedealt.toFixed(0),
                                                        championStats2.average_totaldamagedealt.toFixed(0), championStats2.stddev_totaldamagedealt.toFixed(0), "", 0
                                                        ),
                createData('Average Total Damage Taken', championStats1.average_totaldamagetaken.toFixed(0), championStats1.stddev_totaldamagetaken.toFixed(0),
                                                        championStats2.average_totaldamagetaken.toFixed(0), championStats2.stddev_totaldamagetaken.toFixed(0), "", 0, false, true
                                                        ),
                createData('Average Heals', championStats1.average_totalheal.toFixed(0), championStats1.stddev_totalheal.toFixed(0),
                                            championStats2.average_totalheal.toFixed(0), championStats2.stddev_totalheal.toFixed(0), "", 0
                                            ),
            ];
        } else {
            rows = [
                // createData('Sample Size', championStats1.samplesize, null, championStats2.samplesize, null, "Games", 0, true),
                // createData('Pick Rate', (100.0*championStats1.pickrate).toFixed(2), null, (100.0*championStats2.pickrate).toFixed(2), null, "%", 2, true),
                // createData('Ban Rate', (100.0*championStats1.banrate).toFixed(2), null, (100.0*championStats2.banrate).toFixed(2), null, "%", 2, true),
                createData('Win Rate', (100.0*championStats1.winrate).toFixed(2), null, (100.0*championStats2.winrate).toFixed(2), null, "%", 2),
                createData('Average Kills', championStats1.averagekills.toFixed(2), championStats1.stddevkills.toFixed(2),
                                            championStats2.averagekills.toFixed(2), championStats2.stddevkills.toFixed(2), "", 2
                                            ),
                createData('Average Deaths', championStats1.averagedeaths.toFixed(2), championStats1.stddevdeaths.toFixed(2),
                                            championStats2.averagedeaths.toFixed(2), championStats2.stddevdeaths.toFixed(2), "", 2, false,true
                                            ),
                createData('Average Assists', championStats1.averageassists.toFixed(2), championStats1.stddevassists.toFixed(2),
                                            championStats2.averageassists.toFixed(2), championStats2.stddevassists.toFixed(2), "", 2
                                            ),
                createData('Average Gold Earned', championStats1.average_goldearned.toFixed(0), championStats1.stddev_goldearned.toFixed(0),
                                                championStats2.average_goldearned.toFixed(0), championStats2.stddev_goldearned.toFixed(0), "", 0
                                                ),
                createData('Average Minions Killed', championStats1.average_totalminionskilled.toFixed(2), championStats1.stddev_totalminionskilled.toFixed(2),
                                                    championStats2.average_totalminionskilled.toFixed(2), championStats2.stddev_totalminionskilled.toFixed(2), "", 2
                                                    ),
                createData('Average Total Damage Dealt To Champs', championStats1.average_totaldamagedealttochampions.toFixed(0), championStats1.stddev_totaldamagedealttochampions.toFixed(0),
                                                        championStats2.average_totaldamagedealttochampions.toFixed(0), championStats2.stddev_totaldamagedealttochampions.toFixed(0), "", 0
                                                        ),
                createData('Average Total Damage Dealt', championStats1.average_totaldamagedealt.toFixed(0), championStats1.stddev_totaldamagedealt.toFixed(0),
                                                        championStats2.average_totaldamagedealt.toFixed(0), championStats2.stddev_totaldamagedealt.toFixed(0), "", 0
                                                        ),
                createData('Average Total Damage Taken', championStats1.average_totaldamagetaken.toFixed(0), championStats1.stddev_totaldamagetaken.toFixed(0),
                                                        championStats2.average_totaldamagetaken.toFixed(0), championStats2.stddev_totaldamagetaken.toFixed(0), "", 0, false, true
                                                        ),
                createData('Average Heals', championStats1.average_totalheal.toFixed(0), championStats1.stddev_totalheal.toFixed(0),
                                            championStats2.average_totalheal.toFixed(0), championStats2.stddev_totalheal.toFixed(0), "", 0
                                            ),
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
                {displayRole} Comparison
            </Typography>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right">{champName1}</TableCell>
                        <TableCell align="right">{champName2}</TableCell>
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
