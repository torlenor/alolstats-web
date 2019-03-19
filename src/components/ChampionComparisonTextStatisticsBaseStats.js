import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Typography from '@material-ui/core/Typography';

import Slider from '@material-ui/lab/Slider';

const styles = {
    slider: {
      padding: '24px 10px',
      marginLeft: 25,
      marginRight: 25,
      "overflow-x": "hidden",
    },
    track: {
        backgroundColor: 'green',
    },
  };

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

function ChampionComparisonTextStatisticsBaseStats(props) {
    const {championBaseStats1, championBaseStats2, champName1, champName2} = props;
    const { classes } = props;
    const stats1 = championBaseStats1.stats;
    const stats2 = championBaseStats2.stats;
    const [championLevel, setChampionLevel] = useState(1);

    useEffect(() => {
        // todo
    }, [championBaseStats1, championBaseStats2, champName1, champName2]);

    const rows = [
        createData('Armor', (stats1.armor + championLevel*stats1.armorperlevel).toFixed(2), null, (stats2.armor + championLevel*stats2.armorperlevel).toFixed(2), null, "", 2),
        createData('Health', (stats1.hp + championLevel*stats1.hpperlevel).toFixed(2), null, (stats2.hp + championLevel*stats2.hpperlevel).toFixed(2), null, "", 2),
        createData('Health Regen', (stats1.hpregen + championLevel*stats1.hpregenperlevel).toFixed(2), null, (stats2.hpregen + championLevel*stats2.hpregenperlevel).toFixed(2), null, "", 2),
        createData('Attack Damage', (stats1.attackdamage + championLevel*stats1.attackdamageperlevel).toFixed(2), null, (stats2.attackdamage + championLevel*stats2.attackdamageperlevel).toFixed(2), null, "", 2),
        createData('Attack Range', (stats1.attackrange).toFixed(2), null, (stats2.attackrange).toFixed(2), null, "", 2),
        createData('Attack Speed', (stats1.attackspeed + championLevel*stats1.attackspeedperlevel).toFixed(2), null, (stats2.attackspeed + championLevel*stats2.attackspeedperlevel).toFixed(2), null, "", 2),
        createData('Mana', (stats1.mp + championLevel*stats1.mpperlevel).toFixed(2), null, (stats2.mp + championLevel*stats2.mpperlevel).toFixed(2), null, "", 2),
        createData('Mana Regen', (stats1.mpregen + championLevel*stats1.mpregenperlevel).toFixed(2), null, (stats2.mpregen + championLevel*stats2.mpregenperlevel).toFixed(2), null, "", 2),
        createData('Move Speed', (stats1.movespeed).toFixed(2), null, (stats2.movespeed).toFixed(2), null, "", 2),
    ];

    const handleChange = (event, value) => {
        setChampionLevel(value);
      };

    return (
    <div>
        <Typography variant="h6" gutterBottom component="h4">
            Base Stats at Level {championLevel}
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
        <Slider
            classes={{ container: classes.slider, track: classes.track }}
          value={championLevel}
          min={1}
          max={18}
          step={1}
          onChange={handleChange}
        />
        </div>
    )
}

ChampionComparisonTextStatisticsBaseStats.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ChampionComparisonTextStatisticsBaseStats);
