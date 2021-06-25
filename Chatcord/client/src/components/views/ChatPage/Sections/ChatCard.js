import React from "react";
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';
import Grid from '@material-ui/core/Grid';
import { Card } from "@material-ui/core";

function ChatCard(props) {
    return (
        <Grid>
            <div style={{ width: '100%', }}>
            <Comment
                author={props.sender.name}
                avatar={
                    <Avatar src={props.sender.image} alt={props.sender.name} />
                }
                style={{border: "2px solid #00CC33", marginTop: "25px", borderRadius: "5px", marginBottom: "10px", boxShadow: "0 0 5px #33FF00" , height: "70px"}}
                content={
                    props.message.substring(0, 8) === "uploads/" ?
                        props.message.substring(props.message.length - 3, props.message.length) === 'mp4' ?
                            <video
                                style={{ maxWidth: '200px'}}
                                src={`http://localhost:5000/${props.message}`} alt="video"
                                type="video/mp4" controls
                            />
                            :
                            <img
                                style={{ maxWidth: '200px'}}
                                src={`http://localhost:5000/${props.message}`}
                                alt="img"
                            />
                        :
                        <p style={{color: "#33FF00"}}>
                            {props.message}
                        </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                    </Tooltip>
                }
            />
            </div> 
        </Grid>
        
    )
}

export default ChatCard;

