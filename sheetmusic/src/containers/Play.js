import React from 'react'
import { Piano } from '../components/Piano';
import '../App.css'
import {Card , CardActions, CardContent,Typography,makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    root:{
        minWidth : 275,
    },
    bullet : {
        fontSize : 14,
    },
    pos :{
        marginBottom :12,
    },
})
const Play = () =>{
    const classes = useStyles();
    
    return (
        <div className="App-header">
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    How to play?
                    </Typography>
                    <Typography variant="body2" component="p">
                    You can play piano using keyboard 
                    <br/>
                    white : Z,X ~ M
                    <br/>
                    black : S,D ~ J
                    </Typography>
                </CardContent>
            </Card>
            <Piano/>
        </div>
    )
}

export default Play;