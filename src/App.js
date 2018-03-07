/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import ChatInputBar from './ChatInputBar';
import RichTextWrapper from './RichTextWrapper';

export default class App extends Component<{}> {

  constructor (props) {
    super(props);

    this.state = {
      chatMsg: '',
    };
  }

  _onBtnPress(){
    this.refs.chatInputBar.openInputBar();
  }

  _onSendMsg(text){
    this.setState({
      chatMsg:text,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTitleStyle}>与守望君对话中...</Text>
        </View>
        <View style={styles.contentStyle}>

          <Text>输入内容:</Text>
          {/*<Text>{this.state.chatMsg}</Text>*/}
          <RichTextWrapper textContent={this.state.chatMsg}/>

          <TouchableOpacity onPress={() => this._onBtnPress()}
            activeOpacity={0.5}>
            <View style={styles.buttonStyle}>
              <Text>点击显示输入框</Text>
            </View>
          </TouchableOpacity>

        </View>
        <ChatInputBar ref="chatInputBar" isVisible={true} onSend={(text) => this._onSendMsg(text)}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  headerStyle: {
    width:'100%',
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#56b2f0',
  },

  headerTitleStyle: {
    fontSize:16,
    fontWeight:'bold',
    color:'white',
  },

  contentStyle: {
    width:'100%',
    height:'100%',
    paddingTop:30,
    alignItems:'center',
  },

  buttonStyle: {
    width:150,
    height:40,
    marginTop:180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bbbbbb',
  },

});
