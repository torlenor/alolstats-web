import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import ListIcon from '@material-ui/icons/List';
import ThreeSixty from '@material-ui/icons/ThreeSixty';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const LinkFreeRotation = props => <Link to="/freerotation" {...props} />
const LinkChampions = props => <Link to="/champions" {...props} />
const LinkChampionsSummary = props => <Link to="/championssummary" {...props} />

function TemporaryDrawer(props) {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
    if (!open) {
        props.onClose()
    }
  };

  useEffect(() => {
    setIsOpen(props.open);
  }, [props.open]);

  const sideList = (
    <div className={classes.list}>
    <Typography variant="h6" align="center">
                                    fuu.la
                                    </Typography>
      <Divider />
      <List>
          <ListItem button key={"Free Rotation"} component={LinkFreeRotation}>
            <ListItemIcon><ThreeSixty nativeColor="#FFFFFF"/></ListItemIcon>
            <ListItemText primary={"Free Rotation"} />
          </ListItem>
          <ListItem button key={"Champions"} component={LinkChampions}>
            <ListItemIcon><FaceIcon nativeColor="#FFFFFF"/></ListItemIcon>
            <ListItemText primary={"Champions"} />
          </ListItem>
          <ListItem button key={"Summary"} component={LinkChampionsSummary}>
            <ListItemIcon><ListIcon nativeColor="#FFFFFF"/></ListItemIcon>
            <ListItemText primary={"Summary"} />
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {sideList}
        </div>
      </Drawer>
    </div>
  );
}

export default TemporaryDrawer;
