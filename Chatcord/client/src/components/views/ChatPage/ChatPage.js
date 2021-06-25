import React, { Component } from 'react'
import { Form, Icon, Input, Button, Row, Col, } from 'antd';
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import { getChats, afterPostMessage } from "../../../_actions/chat_actions"
import ChatCard from "./Sections/ChatCard"
import Dropzone from 'react-dropzone';
import Axios from 'axios';

export class ChatPage extends Component {
    state = {
        chatMessage: "",
    }

    componentDidMount() {
        let server = "http://localhost:5000";

        this.props.dispatch(getChats());

        this.socket = io(server);

        this.socket.on("Output Chat Message", messageFromBackEnd => {
            console.log(messageFromBackEnd)
            this.props.dispatch(afterPostMessage(messageFromBackEnd));
        })
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    hanleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }

    renderCards = () =>
        this.props.chats.chats
        && this.props.chats.chats.map((chat) => (
            <ChatCard key={chat._id}  {...chat} />
        ));

    onDrop = (files) => {
        console.log(files)


        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in first');
        }



        let formData = new FormData;

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append("file", files[0])

        Axios.post('api/chat/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    let chatMessage = response.data.url;
                    let userId = this.props.user.userData._id
                    let userName = this.props.user.userData.name;
                    let userImage = this.props.user.userData.image;
                    let channel = this.props.user.userData.channel;
                    let nowTime = moment();
                    let type = "VideoOrImage"

                    this.socket.emit("Input Chat Message", {
                        chatMessage,
                        userId,
                        userName,
                        userImage,
                        channel,
                        nowTime,
                        type
                    });
                }
            })
    }


    submitChatMessage = (e) => {
        e.preventDefault();

        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in first');
        }

        let chatMessage = this.state.chatMessage
        let userId = this.props.user.userData._id
        let userName = this.props.user.userData.name;
        let userImage = this.props.user.userData.image;
        let channel = this.props.user.userData.channel;
        let nowTime = moment();
        let type = "Text"
        let tmp = [];
        const cmds = ["nick", "list", "create", "delete", "join", "quit", "users", "msg"];

        if (chatMessage[0] === '/') {
            tmp = chatMessage.split(" ");
            const inputUser = tmp[0].replace('/', '');
            if(cmds.includes(inputUser) ){
                if (tmp.length != 2 && inputUser != "users")
                    console.log("Missing parameter");
                else {
                    if (inputUser == "join")
                        console.log("You have join: " + tmp[1])
                    if (inputUser == "nick")
                        console.log("You have change your nickname by: " + tmp[1]);
                    if (inputUser == "list")
                        console.log("here is the list of chanels containing this word: " + tmp[1]);
                    if (inputUser == "delete")
                        console.log("You have delete this channel: " + tmp[1]);
                    if (inputUser == "quit")
                        console.log("You leave this channel: " + tmp[1]);
                    if (inputUser == "users")
                        console.log("here is the list of the users on this channel");
                    //if (inputUser == "msg")
                        //j'ai pas compris cette commande 
                }
            }
        }



        
        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            userImage,
            channel,
            nowTime,
            type
        });
        this.setState({ chatMessage: "" })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <p style={{ fontSize: '2rem', textAlign: 'center', color: "grey", marginTop: "50px"}}> Nom du chanel</p>
                </div>

                <div style={{ maxWidth: '800px', marginTop: '5%', marginLeft: '29%', backgroundColor: "white", border: "4px solid #00CC33", borderRadius: "10px", boxShadow: "0 0 30px #33FF00"}}>
                    <div style={{ height: '500px', overflowY: 'scroll' }}>
                        {this.props.chats && (
                            this.renderCards()
                        )}
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                            style={{ float: "left", clear: "both" }}
                        />
                    </div>

                    <Row >
                        <Form layout="inline" onSubmit={this.submitChatMessage}>
                            <Col span={18}>
                                <Input
                                    id="message"
                                    prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Let's start talking"
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.hanleSearchChange}
                                />
                            </Col>
                            <Col span={2}>
                                <Dropzone onDrop={this.onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Button >
                                                    <Icon type="upload" />
                                                </Button>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </Col>

                            <Col span={4}>
                                <Button  style={{ width: '100%', backgroundColor: " #00CC33" }} onClick={this.submitChatMessage} htmlType="submit">
                                    <Icon type="enter" />
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        chats: state.chat
    }
}


export default connect(mapStateToProps)(ChatPage);
