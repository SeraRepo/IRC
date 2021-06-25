import React from 'react'
import { Grid, Typography} from '@material-ui/core';

const usestyle = {
    containerFirstGrid: {
        backgroundColor: "#00b100", 
        height: "60px",
    },
}

export default function ReturnHome() {
    return (
        <Grid item sm={12} style={usestyle.containerFirstGrid} container spacing={0} direction="column" alignItems="center" justify="center">
            <Typography variant="h6">
                IRC-CHAT
            </Typography>
        </Grid>
    )
}