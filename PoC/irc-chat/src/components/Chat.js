import React from 'react'
import { Grid, Card } from '@material-ui/core';
import ReturnHome from './ReturnHome'
import ListUserChanels from './ListUserChanels'
import DisplayMessage from './DisplayMessage'
import SendMessage from './SendMessage'

const usestyle = {
    containerGridPrincipal: {
        backgroundColor: "black",
        height: "981px",
        width: "100%",
    },
    containerCard: {
        width: "1000px",
    },
    conatinerSecondGrid: {
        backgroundColor: "#00FF00",
        height: "400px",
    },
}
export default function Chat() {
    return (
        <Grid container item sm={12} style={usestyle.containerGridPrincipal}>
            <Grid item sm sm={12} container spacing={0} direction="column" alignItems="center" justify="center">
                <Card style={usestyle.containerCard}>
                    <ReturnHome/>
                    <Grid container  style={usestyle.conatinerSecondGrid}>
                        <ListUserChanels/>
                        <DisplayMessage/>
                    </Grid>
                    <SendMessage/>
                </Card>
            </Grid>
        </Grid>
    )
}