import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu style={{backgroundColor: "white", fontSize: "20px"}} mode={props.mode}>
    <Menu.Item key="chat">
      <a href="/chat" style={{color: "#33FF00"}}>Chat</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu