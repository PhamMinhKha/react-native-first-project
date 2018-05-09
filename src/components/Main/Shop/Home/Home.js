import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Collection from './Collection';
import Category from './Category';
import TopProduct from './TopProduct';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topProducts : []
        }
       
    }
    
    componentWillReceiveProps(nextProps){
        const { topProducts } = nextProps;
        this.setState({
            topProducts
        })
        
    }
    render() {
        const { types, topProducts } = this.props;
        return (
            <ScrollView
             style={{ flex:1, backgroundColor:'#DBDBDB'}}>
                <Collection/>
                <Category types={types} navigation={this.props.navigation}/>
                <TopProduct navigation={this.props.navigation} topProducts={this.state.topProducts}/>
                <TouchableOpacity >
                    <Text>on press</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

export default Home;