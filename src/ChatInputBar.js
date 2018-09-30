/**
 * Desc: 聊天输入框
 *
 * Created by WangGanxin on 2018/1/29
 * Email: mail@wangganxin.me
 */
import React, {Component,PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Modal,
} from 'react-native';

import PropTypes from 'prop-types';
import EmotionsView from './EmotionsView';
import ModalBox from 'react-native-modalbox';
import Line from './Line';
import {EMOTIONS_ZHCN,invertKeyValues} from './DataSource';

let emojiReg = new RegExp('\\[[^\\]]+\\]','g'); //表情符号正则表达式

export default class ChatInputBar extends PureComponent {

  constructor(props){
    super(props);

    this.state = {
      isEmotionsVisible:false, //表情框是否可见
      modalVisible:false,
      inputValue:'',
      cursorIndex:0,
      autoFocus:true,
      tempSendTxtArray:[],
    };
  }

  openInputBar(){

    if (Platform.OS === 'android'){
      this.refs.modal.open();
    }
    else {
      this.setState({
        modalVisible:!this.state.modalVisible,
      });
    }

  }

  closeInputBar(){
    if (Platform.OS === 'android'){
      this.refs.modal.close();
    }
    else {
      this.setState({
        modalVisible:false,
      });
    }

  }

  _matchContentString(textContent){

    // 匹配得到index并放入数组中
    let currentTextLength = textContent.length;

    let emojiIndex = textContent.search(emojiReg);

    let checkIndexArray = [];

    // 若匹配不到，则直接返回一个全文本
    if (emojiIndex === -1) {

      this.state.tempSendTxtArray.push(textContent.substring(0,currentTextLength));

    } else {

      if (emojiIndex !== -1) {
        checkIndexArray.push(emojiIndex);
      }

      // 取index最小者
      let minIndex = Math.min(...checkIndexArray);

      // 将0-index部分返回文本
      this.state.tempSendTxtArray.push(textContent.substring(0, minIndex));

      // 将index部分作分别处理
      this._matchEmojiString(textContent.substring(minIndex));
    }
  }

  _matchEmojiString(emojiStr) {

    let castStr = emojiStr.match(emojiReg);
    let emojiLength = castStr[0].length;

    let emotoins_code = invertKeyValues(EMOTIONS_ZHCN);

    this.state.tempSendTxtArray.push(emotoins_code[castStr[0]]);

    this._matchContentString(emojiStr.substring(emojiLength));

  }

  _toogleShowEmojiView(){

    if (!this.state.isEmotionsVisible){
      Keyboard.dismiss();
    }

    this.setState({
      isEmotionsVisible:!this.state.isEmotionsVisible,
    });

  }

  _onModalBoxClosed(){
    this.setState({
      isEmotionsVisible:false,
    });
  }

  _onEmojiSelected(code){

    if (code === '' ){
      return;
    }

    let lastText = '';
    let currentTextLength = this.state.inputValue.length;

    if (code === '/{del'){ //删除键

      if (currentTextLength === 0){
        return;
      }

      if (this.state.cursorIndex < currentTextLength){ //光标在字符串中间

        let emojiReg = new RegExp('\\[[^\\]]+\\]'); //表情符号正则表达式

        let emojiIndex = this.state.inputValue.search(emojiReg); //匹配到的第一个表情符位置

        if (emojiIndex === -1){ //没有匹配到表情符
          let preStr = this.state.inputValue.substring(0,this.state.cursorIndex);
          let nextStr = this.state.inputValue.substring(this.state.cursorIndex);
          lastText = preStr.substring(0,preStr.length - 1) + nextStr;

          this.setState({
            cursorIndex:preStr.length - 1,
          });
        }
        else {

          let preStr = this.state.inputValue.substring(0,this.state.cursorIndex);
          let nextStr = this.state.inputValue.substring(this.state.cursorIndex);

          let lastChar = preStr.charAt(preStr.length - 1);
          if (lastChar === ']'){

            let castArray = preStr.match(emojiReg);

            if(!castArray){
              let cast = castArray[castArray.length - 1];

              lastText = preStr.substring(0,preStr.length - cast.length) + nextStr;

              this.setState({
                cursorIndex:preStr.length - cast.length,
              });
            }
            else{
              lastText = preStr.substring(0,preStr.length - 1) + nextStr;

              this.setState({
                cursorIndex:preStr.length - 1,
              });
            }

          } else {

            lastText = preStr.substring(0,preStr.length - 1) + nextStr;
            this.setState({
              cursorIndex:preStr.length - 1,
            });
          }
        }

      }
      else {  //光标在字符串最后

        let lastChar = this.state.inputValue.charAt(currentTextLength - 1);
        if (lastChar === ']'){
          let castArray = this.state.inputValue.match(emojiReg);

          if(castArray){
            let cast = castArray[castArray.length - 1];
            lastText = this.state.inputValue.substring(0,this.state.inputValue.length - cast.length);

            this.setState({
              cursorIndex:this.state.inputValue.length - cast.length,
            });
          }
          else{
            lastText = this.state.inputValue.substring(0,this.state.inputValue.length - 1);

            this.setState({
              cursorIndex:this.state.inputValue.length - 1,
            });
          }

        }
        else {

          lastText = this.state.inputValue.substring(0,currentTextLength - 1);
          this.setState({
            cursorIndex:currentTextLength - 1,
          });
        }
      }


    }
    else {

      if (this.state.cursorIndex >= currentTextLength) {
        lastText = this.state.inputValue + EMOTIONS_ZHCN[code];

        this.setState({
          cursorIndex:lastText.length
        });

      }
      else {
        let preTemp = this.state.inputValue.substring(0,this.state.cursorIndex);
        let nextTemp = this.state.inputValue.substring(this.state.cursorIndex,currentTextLength);
        lastText = preTemp + EMOTIONS_ZHCN[code] + nextTemp;

        this.setState({
          cursorIndex:this.state.cursorIndex + EMOTIONS_ZHCN[code].length
        });
      }
    }

    this.setState({
      inputValue:lastText,
    });
    this._onInputChangeText(lastText);

  }

  _onSelectionChange(event){

    this.setState({
      cursorIndex:event.nativeEvent.selection.start,
    });
  }

  _onInputChangeText(text){

    //设值
    this.setState({
      inputValue:text,
    });

    //改变按钮颜色
    if (text !== '' && text.length > 0){
      this.refs.sendBtnWrapper.setNativeProps({
        style:{
          backgroundColor:'#56b2f0'
        },
      });

      this.refs.sendBtnText.setNativeProps({
        style:{
          color:'#1d1d1d'
        },
      });
    }
    else {
      this.refs.sendBtnWrapper.setNativeProps({
        style:{
          backgroundColor:'#f5f5f5'
        }
      });

      this.refs.sendBtnText.setNativeProps({
        style:{
          color:'#bbbbbb',
        }
      });
    }
  }

  _onFocus(){
    this.setState({
      isEmotionsVisible:false,
    });
  }

  _onSendMsg(){

    this.setState({
      tempSendTxtArray:[],
    });

    let finalMsg = '';
    if (this.state.inputValue !== '' && this.state.inputValue.length > 0) {
      this._matchContentString(this.state.inputValue);

      for (let i = 0; i < this.state.tempSendTxtArray.length; i++){
        finalMsg += this.state.tempSendTxtArray[i];
      }

      this._onInputChangeText('');
      this.props.onSend(finalMsg);
    }

  }

  render() {
    if (Platform.OS === 'android'){
      return this._renderAndroidView();
    }

    return this._renderIosView();

  }

  _renderAndroidView(){
    return <ModalBox
      swipeToClose={false}
      backdropOpacity={0}
      backButtonClose={true}
      onClosed={() => this._onModalBoxClosed()}
      style={[styles.container]} position={'bottom'} ref={'modal'}>

      <TouchableWithoutFeedback onPress={() => this.closeInputBar()}>
        <View style={styles.box_container}/>
      </TouchableWithoutFeedback>
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <TouchableWithoutFeedback
            onPress={() => this._toogleShowEmojiView()}>
            <Image style={styles.emojiStyle} source={require('./emotions/ic_emoji.png')}/>
          </TouchableWithoutFeedback>

          <TextInput
            ref="textInput"
            style={styles.inputStyle}
            underlineColorAndroid="transparent"
            multiline = {true}
            autoFocus={true}
            editable={true}
            placeholder={'说点什么'}
            placeholderTextColor={'#bababf'}
            onSelectionChange={(event) => this._onSelectionChange(event)}
            onChangeText={(text) => this._onInputChangeText(text)}
            onFocus={() => this._onFocus()}
            defaultValue={this.state.inputValue}/>

          <TouchableWithoutFeedback onPress={() => this._onSendMsg()}>
            <View ref="sendBtnWrapper" style={[styles.sendBtnStyle]}>
              <Text ref="sendBtnText" style={[styles.sendBtnTextStyle]}>发送</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Line lineColor={'#bababf'}/>
        {
          this.state.isEmotionsVisible &&
          <EmotionsView onSelected={(code) => this._onEmojiSelected(code)}/>
        }
      </View>
    </ModalBox>;
  }

  _renderIosView(){

    return <Modal
      animationType={'slide'} transparent={true} visible={this.state.modalVisible}>

      <TouchableWithoutFeedback onPress={() => this.closeInputBar()}>
        <View style={styles.box_container}/>
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView behavior={'position'}>
        <View style={styles.inputContainer}>

          <View style={styles.textContainer}>
            <TouchableWithoutFeedback
              onPress={() => this._toogleShowEmojiView()}>
              <Image style={styles.emojiStyle} source={require('./emotions/ic_emoji.png')}/>
            </TouchableWithoutFeedback>

            <TextInput
              ref="textInput"
              style={styles.inputStyle}
              underlineColorAndroid="transparent"
              multiline = {true}
              autoFocus={true}
              editable={true}
              keyboardType={'default'}
              selectionColor={'#56b2f0'}
              returnKeyType={'send'}
              placeholder={'说点什么'}
              enablesReturnKeyAutomatically={true}
              placeholderTextColor={'#bababf'}
              onSelectionChange={(event) => this._onSelectionChange(event)}
              onChangeText={(text) => this._onInputChangeText(text)}
              onFocus={() => this._onFocus()}
              defaultValue={this.state.inputValue}/>

            <TouchableWithoutFeedback onPress={() => this._onSendMsg()}>
              <View ref="sendBtnWrapper" style={[styles.sendBtnStyle]}>
                <Text ref="sendBtnText" style={[styles.sendBtnTextStyle]}>发送</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Line lineColor={'#bababf'}/>

          {
            this.state.isEmotionsVisible &&
          <EmotionsView onSelected={(code) => this._onEmojiSelected(code)}/>
          }
        </View>
      </KeyboardAvoidingView>
    </Modal>;
  }

}

Line.defaultProps = {
  isVisible: false,
};

ChatInputBar.propTypes = {
  onSend:PropTypes.func,  //返回text文本
  isVisible:PropTypes.bool,
};

const styles = StyleSheet.create({

  container: {
    width:'100%',
    height:235,
    backgroundColor:'transparent',
  },

  box_container: {
    flex:1,
  },

  inputContainer: {
    width:'100%',
    position:'absolute',
    bottom:0,

  },

  textContainer: {
    width:'100%',
    height:48,
    flexDirection:'row',
    backgroundColor:'white',
    alignItems:'center',
  },

  outside: {
    flex:1,
    width:'100%',
  },

  emojiStyle:{
    height:28,
    width:28,
    marginLeft:10,
  },

  inputStyle:{
    flex:1,
    paddingTop:8,
    paddingBottom:8,
    paddingLeft:10,
    paddingRight:10,
    height:32,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'#f5f5f5',
    borderWidth:0,
    borderRadius:20,
    fontSize:15,
  },

  sendBtnTextStyle:{
    fontSize:15,
    color:'#bbbbbb'
  },

  sendBtnStyle:{
    height:32,
    width:62,
    justifyContent:'center',
    alignItems:'center',
    marginRight:10,
    borderRadius:15,
    backgroundColor:'#f5f5f5'
  },

});
