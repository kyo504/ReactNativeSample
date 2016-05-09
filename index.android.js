/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  Navigator,
  View
} from 'react-native';

var SearchPage = require('./SearchPage');
var SearchResults = require('./SearchResults');
var PropertyView = require('./PropertyView');

class ReactNativeSample extends Component {
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ name: 'SearchPage', passProps: {} }}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          } 
          return Navigator.SceneConfigs.FloatFromRight;
        }}
      />
    );
  }

  renderScene(route, navigator) {
    var routeName = route.name;
    if (routeName == 'SearchPage') {
      return (
        <SearchPage
          navigator={navigator} {...route.passProps}/>
      )
    }

    if (routeName == 'SearchResults') {
      return (
        <SearchResults
          navigator={navigator} {...route.passProps}/>
      )
    }

    if (routeName == 'PropertyView') {
      return (
        <PropertyView
          navigator={navigator} {...route.passProps}/>
      )
    }

//    return this.noRoute(navigator);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  }
});

AppRegistry.registerComponent('ReactNativeSample', () => ReactNativeSample);
