'use strict'

var React = require('react-native');
var PropertyView = require('./PropertyView');
var {
	StyleSheet,
	Image,
	View,
	TouchableHighlight,
	ListView,
	Text,
	Component,
	ScrollView
} = React;

class SearchResults extends Component {

	constructor(props) {
		super(props);
		var dataSource = new ListView.DataSource(
			{rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
		this.state = {
			dataSource: dataSource.cloneWithRows(this.props.listings)
		};
	}

	rowPressed(propertyGuid) {
		//var property = this.props.listings.filter(prop => prop.guid === propertyGuid)[0];
		var property = this.props.listings[propertyGuid];

		this.props.navigator.push({
			name: 'PropertyView',
			// title: 'Property',
			// component: PropertyView,
			passProps: {
				property: property
			}
		});
	}

	renderRow(rowData, sectionID, rowID) {

		return (
			<TouchableHighlight onPress={() => this.rowPressed(rowID)}
				underlayColor='#dddddd'>
				<View style={styles.rowContainer}>
					<Image 
						style={styles.thumb} 
						resizeMode='cover'
						source={{ uri: rowData.images.thumbnail.url }} 
					/>
				</View>
			</TouchableHighlight>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)}/>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		flex:1,
		flexDirection: 'column'
	}	,
  thumb: {
    flex: 1,
    height: 80,
    width: null
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
  	flex: 1,
  }
});


module.exports = SearchResults;