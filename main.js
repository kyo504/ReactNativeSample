import React, {
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

class Main extends Component {
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
    switch(route.name) {
      case 'SearchPage':
        return (<SearchPage navigator={navigator} {...route.passProps}/>);
      case 'SearchResults':
        return (<SearchResults navigator={navigator} {...route.passProps}/>);
      case 'PropertyView':
        return (<PropertyView navigator={navigator} {...route.passProps}/>);
      default:
        return (<SearchPage navigator={navigator} {...route.passProps}/>);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = Main;
