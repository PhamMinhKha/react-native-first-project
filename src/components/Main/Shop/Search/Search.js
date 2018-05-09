import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SearchView from './SearchView';

class Search extends Component {
    render() {
        return (
            <SearchView navigation={this.props.navigation}/>
        );
    }
}

export default Search;