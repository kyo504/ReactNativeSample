'use strict'

var React = require('react-native');
var SearchResults = require('./SearchResults');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React;

//https://api.instagram.com/v1/tags/cats/media/recent?access_token=2253563781.137bf98.bd1c3693d2b84f80a7ab8d661f641437

function urlForQueryAndPage(tagName) {
	var access_token = "2253563781.137bf98.bd1c3693d2b84f80a7ab8d661f641437"

	// data[key] = value;

	// var querystring = Object.keys(data)
	// 	.map(key => key + '=' + encodeURIComponent(data[key]))
	// 	.join('&');

	return 'https://api.instagram.com/v1/tags/' + tagName + '/media/recent?access_token=' + access_token;
}

class SearchPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchString: 'london',
			isLoading: false,
			message: ''
		};
	}

	onSearchTextChanged(e) {
		console.log('onSearchTextChanged');
		this.setState({ searchString: e.nativeEvent.text });
		console.log(this.state.searchString);
	}

	_executeQuery(query) {
		console.log(query);
		this.setState({ isLoading: true });

		// 이거 어떻게 동작하는거지...
		fetch(query)
			.then(response => response.json())
			.then(json => this._handleResponse(json))
			.catch(error => 
				this.setState({
					isLoading: false,
					message: 'Something bad happened ' + error
			}));
	}

	_handleResponse(response) {
		this.setState({ isLoading: false, message: '' });
		this.props.navigator.push({
			name: 'SearchResults',
			passProps: {
				listings: response.data
			}
		});
	}

	onSearchPressed() {
		var query = urlForQueryAndPage(this.state.searchString);
		this._executeQuery(query);
	}

	render() {
		console.log('SearchPage.render');
		return (
			<View style={styles.container}>
				<Text style={styles.description}>
				Search for house to buy!
				</Text>
				<Text style={styles.description}>
				Search by place-name, post code or search near your location.
				</Text>
				<View style={styles.flowRight}>
					<TextInput
						style={styles.searchInput}
						value={this.state.searchString}
						onChange={this.onSearchTextChanged.bind(this)}
						placeholder='Search via name or postcode'/>
					<TouchableHighlight 
						style={styles.button}
						onPress={this.onSearchPressed.bind(this)}
						underlayColor='#99d9f4'>
						<Text style={styles.buttonText}>Go</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth:1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
  	width: 217,
  	height: 138
  }
});


module.exports = SearchPage;