import React from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import "./RunesReforgedDisplayDivs.css";

const STATIC_DATA_BASE_URL = `${process.env.REACT_APP_STATIC_DATA_BASE_URL}`;

const styles = theme => ({
    lightTooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
      },
  });

let id = 0;
function addPrimaryRune(runeImg, opacity) {
  id += 1;
  return { id, runeImg, opacity };
}

id = 0;
function addKeystone(img, opacity) {
  id += 1;
  return { id, img, opacity };
}

id = 0;
function addSlot(img, opacity) {
    id += 1;
    return { id, img, opacity };
}

const NOT_SELECTED_OPACITY = 0.3;
const SELECTED_OPACITY = 1.0;

const BASE_PERK_IMAGE_PATH = `${STATIC_DATA_BASE_URL }/9.8.1/img/perk-images/Styles`

let primaryRunes = [
    addPrimaryRune('7201_Precision.png', NOT_SELECTED_OPACITY),
    addPrimaryRune('7200_Domination.png', NOT_SELECTED_OPACITY),
    addPrimaryRune('7202_Sorcery.png', SELECTED_OPACITY),
    addPrimaryRune('7204_Resolve.png', NOT_SELECTED_OPACITY),
    addPrimaryRune('7203_Whimsy.png', NOT_SELECTED_OPACITY),
];

let keystones = [
    addKeystone('Sorcery/SummonAery/SummonAery.png', SELECTED_OPACITY),
    addKeystone('Sorcery/ArcaneComet/ArcaneComet.png', NOT_SELECTED_OPACITY),
    addKeystone('Sorcery/PhaseRush/PhaseRush.png', NOT_SELECTED_OPACITY),
];

let slots1 = [
    addSlot('Sorcery/NullifyingOrb/Pokeshield.png', NOT_SELECTED_OPACITY),
    addSlot('Sorcery/ManaflowBand/ManaflowBand.png', SELECTED_OPACITY),
    addSlot('Sorcery/NimbusCloak/6361.png', NOT_SELECTED_OPACITY),
];

let slots2 = [
    addSlot('Sorcery/Transcendence/Transcendence.png', NOT_SELECTED_OPACITY),
    addSlot('Sorcery/Celerity/CelerityTemp.png', SELECTED_OPACITY),
    addSlot('Sorcery/AbsoluteFocus/AbsoluteFocus.png', NOT_SELECTED_OPACITY),
];

let slots3 = [
    addSlot('Sorcery/Scorch/Scorch.png', NOT_SELECTED_OPACITY),
    addSlot('Sorcery/Waterwalking/Waterwalking.png', NOT_SELECTED_OPACITY),
    addSlot('Sorcery/GatheringStorm/GatheringStorm.png', SELECTED_OPACITY),
];

function RunesReforgedDisplay(props) {
    const { classes } = props;

    return <div>
            <Typography variant="h6">
                    Recommended Runes Reforged
            </Typography>
            <div class="primary-runes">
                <div>
                    {primaryRunes.map(primaryRune => (
                        <div class="primary-rune">
                        <Tooltip title={primaryRune.runeImg} classes={{ tooltip: classes.lightTooltip }}>
                            <img src={`${BASE_PERK_IMAGE_PATH}/${primaryRune.runeImg}`} style={{opacity: primaryRune.opacity}} alt=""/>
                        </Tooltip>
                        </div>
                    ))}
                </div>
            </div>

            <div class="keystones">
                <div>
                    {keystones.map(keystone => (
                        <div class="keystone">
                        <Tooltip title={keystone.img} classes={{ tooltip: classes.lightTooltip }}>
                            <img src={`${BASE_PERK_IMAGE_PATH}/${keystone.img}`} height={48} width={48} style={{opacity: keystone.opacity}} alt=""/>
                        </Tooltip>
                        </div>
                    ))}
                </div>
            </div>

            <div class="keystones">
                <div>
                    {slots1.map(slot => (
                        <div class="keystone">
                        <Tooltip title={slot.img} classes={{ tooltip: classes.lightTooltip }}>
                            <img src={`${BASE_PERK_IMAGE_PATH}/${slot.img}`} height={32} width={32} style={{opacity: slot.opacity}} alt="dd"/>
                        </Tooltip>
                        </div>
                    ))}
                </div>
            </div>

            <div class="keystones">
                <div>
                    {slots2.map(slot => (
                        <div class="keystone">
                        <Tooltip title={slot.img} classes={{ tooltip: classes.lightTooltip }}>
                            <img src={`${BASE_PERK_IMAGE_PATH}/${slot.img}`} height={32} width={32} style={{opacity: slot.opacity}} alt="dd"/>
                        </Tooltip>
                        </div>
                    ))}
                </div>
            </div>

            <div class="keystones">
                <div>
                    {slots3.map(slot => (
                        <div class="keystone">
                        <Tooltip title={slot.img} classes={{ tooltip: classes.lightTooltip }}>
                            <img src={`${BASE_PERK_IMAGE_PATH}/${slot.img}`} height={32} width={32} style={{opacity: slot.opacity}} alt="dd"/>
                        </Tooltip>
                        </div>
                    ))}
                </div>
            </div>
        </div>;
}

RunesReforgedDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(RunesReforgedDisplay);
