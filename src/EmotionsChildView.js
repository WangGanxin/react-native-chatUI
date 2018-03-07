/**
 * Desc: EmotionsChildView
 *
 * Created by WangGanxin on 2018/1/31
 * Email: mail@wangganxin.me
 */

import React, {Component,PureComponent} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import PropTypes from 'prop-types';
import {EMOTIONS_DATA} from './DataSource';

let {width} = Dimensions.get('window');
let itemWidth = width / 7;

export default class EmotionsChildView extends PureComponent {

  constructor(props){
    super(props);

  }

    _rednerItem=(item) => {

      if (item.item.value === '/{del'){
        return <TouchableWithoutFeedback onPress={() => this.props.onPress(item.item.value)}>
          <View key={item.item.key} style={styles.itemStyle}>
            <Image style={styles.deleteStyle}  source={require('./emotions/ic_emoji_del.png')}/>
          </View>
        </TouchableWithoutFeedback>;
      }
      return <TouchableWithoutFeedback onPress={() => this.props.onPress(item.item.value)}>
        <View key={item.item.key} style={styles.itemStyle}>
          <Image style={styles.emojiStyle} source={EMOTIONS_DATA[item.item.value]}/>
        </View>
      </TouchableWithoutFeedback>;

    }

    render(){
      return (
        <FlatList
          style={[styles.wrapper,this.props.style]}
          horizontal={false}
          numColumns={7}
          refreshing={false}
          scrollEnabled={false}
          initialNumToRender={21}
          data={this.props.dataSource}
          renderItem={this._rednerItem}/>
      );
    }

}

EmotionsChildView.propTypes = {

  dataSource: PropTypes.array.isRequired,
  onPress:PropTypes.func,
};

EmotionsChildView.defaultProps = {
  dataSource:[],
};

const styles = StyleSheet.create({

  wrapper: {
    width:'100%',
    height:175,
  },

  itemStyle: {
    width:itemWidth,
    height:50,
    justifyContent:'center',
    alignItems:'center',
  },

  emojiStyle:{
    width:35,
    height:35,
  },

  deleteStyle:{
    width:35,
    height:24,
  }
});
