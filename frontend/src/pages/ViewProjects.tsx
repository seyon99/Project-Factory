import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    cursor: "pointer",
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


  return (
      <div className={classes.root}>
        <Card className={classes.card} onClick={(event) => 
          {proj}}>          
          <CardContent>
            <h4>test</h4>
          </CardContent>
          <CardActions>
            <Button size="small">Like</Button>
          </CardActions>
        </Card>
      </div>
  );
}

export default App;