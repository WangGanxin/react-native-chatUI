/**
 * Desc: 1px分割线
 *
 * Created by WangGanxin on 2018/2/12
 * Email: mail@wangganxin.me
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  PixelRatio
} from 'react-native';
import PropTypes from 'prop-types';

let defaultColor = '#bababf';

export default class Line extends Component {

  render () {
    return (
      <View style={[styles.container,{backgroundColor:this.props.lineColor}]} />
    );
  }
}

Line.defaultProps = {
  lineColor: defaultColor,
};

Line.propTypes = {
  lineColor:PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:1 / PixelRatio.get(),
  },
});
