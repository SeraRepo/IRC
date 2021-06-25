import React from 'react'
import{ Link }from "react-router-dom";
import { Grid, Card, Typography, InputBase, MenuItem, FormControl, InputLabel, Select, Button } from '@material-ui/core';

const useStyle = {
    containerGridPrincipal: {
        backgroundColor: "black",
        height: "981px",
        width: "100%",
    },
    containerCard: {
        backgroundColor: "black",
        width: "500px",
        height: "500px",
        position: "realtive"
    },
    conatinerFirstGrid: {
        backgroundColor: "#00b100", 
        height: "60px",
    },
    containerSecondGrid: {
        backgroundColor: "#00FF00", 
        height: "440px"
    },
    containerTitleInput: {
        marginTop: "30px",
        
    },
    TitleInput: {
        marginLeft: "60px"
    },
    conatinerInputBase: {
        border: "2px solid black",
        width: "400px",
        height: "60px",
        marginTop: "20px",
        borderRadius: "20px"
    },
    ContainerButton: {
        background: "black",
        color: "white",
        width: "400px",
        marginTop: "80px"
    }
}

export default function Home() {
    const [chanels, setchanels] = React.useState('');

    const handleChange = (event) => {
        setchanels(event.target.value);
    }
    
    return (
        <Grid container item sm={12} style={useStyle.containerGridPrincipal}>
            <Grid item sm sm={12} container spacing={0} direction="column" alignItems="center" justify="center">
                <Card style={useStyle.containerCard}>
                    <Grid item sm={12} container spacing={0} direction="column" alignItems="center" justify="center" style={useStyle.conatinerFirstGrid}>
                        <Typography variant='h6'>
                            IRC-CHAT
                        </Typography>
                    </Grid>
                    <Grid item sm={12} style={useStyle.containerSecondGrid}>
                        <Grid item sm={12} container spacing={0} direction="column" alignItems="center" justify="center">
                            <Grid item sm={12} container justify="flex-start" style={useStyle.containerTitleInput}>
                                <Typography variant="body1" style={useStyle.TitleInput}>
                                    Pseudo
                                </Typography>
                            </Grid>
                            <Grid item sm={12}>
                                <InputBase placeholder="Enter Pseudo..." variant="outlined" style={useStyle.conatinerInputBase}/>
                            </Grid>
                        </Grid>
                        <Grid item sm={12} container spacing={0} direction="column" alignItems="center" justify="center">
                            <Grid item sm={12} container justify="flex-start" style={useStyle.containerTitleInput}>
                                <Typography variant="body1" style={useStyle.TitleInput}>
                                    Chanels
                                </Typography>
                            </Grid>
                            <Grid item sm={12}>
                                <FormControl variant="filled" style={{marginTop: "20px", width: "400px"}}>
                                    <InputLabel id="demo-simple-select-filled-label">Chanels</InputLabel>
                                    <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" value={chanels} onChange={handleChange}>
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value={"CPP"}>CPP</MenuItem>
                                        <MenuItem value={"HTML"}>Twenty</MenuItem>
                                        <MenuItem value={"C#"}>C#</MenuItem>
                                        <MenuItem value={"PYTHON"}>PYTHON</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={12}>
                                <Link to="/chat"><Button variant="contained" style={useStyle.ContainerButton}>Join Chanels</Button></Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}