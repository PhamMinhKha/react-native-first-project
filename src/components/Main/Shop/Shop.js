import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home/Home';
import Cart from './Cart/Cart';
import Search from './Search/Search';
import Contact from './Contact/Contact';
import Header from '../../Header';
import { log } from 'core-js';
import global from '../../global';
import initData from '../../../api/initData';
import saveCart from '../../../api/saveCart';
import getCart from '../../../api/getCart';

const { height } = Dimensions.get('window')

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedTab: 'home',
            types: [],
            TopProducts: [],
            cartArray: []
        }
        global.addProductToCart = this.addProductToCart.bind(this);
    }
    addProductToCart(product){
        this.setState({
            cartArray: this.state.cartArray.concat({product, quantity: 1})
        },() =>{ saveCart(this.state.cartArray);})
        console.log('99999999999999999999999999');
        console.log(this.state.cartArray);
        console.log('99999999999999999999999999');
       
    }
    openMenu() {
        const { open } = this.props;
        open();
    }
    componentDidUpdate(){
        // console.log('====================================');
        // console.log(this.state.cartArray);
        // console.log('====================================');
    }
    componentDidMount(){
        
        initData()
        .then(resJSON => {
            this.setState({types: resJSON.type,
                TopProducts: resJSON.product
            })
        });
        getCart().then(cartArray => this.setState({
            cartArray
        }));
    }
    render() {
        const { types, TopProducts } = this.state;
        return (
            <View style={{ flex:1 }}>
                <Header onOpen={this.openMenu.bind(this)}/>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="Home"
                        badgeText="1"
                        renderIcon={() => <Image style={styles.icon} source={require('../../../assets/appicon/home0.png')} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require('../../../assets/appicon/home.png')} />}
                        onPress={() => this.setState({ selectedTab: 'home' })}
                        >
                        <Home navigation={this.props.navigation} types={types} topProducts={TopProducts}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'cart'}
                        title="Cart"
                        badgeText={this.state.cartArray.length}
                        renderIcon={() => <Image style={styles.icon} source={require('../../../assets/appicon/cart0.png')} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require('../../../assets/appicon/cart.png')} />}
                        onPress={() => this.setState({ selectedTab: 'cart' })}>
                        <Cart navigation={this.props.navigation} cartArray={this.state.cartArray}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Search'}
                        title="Search"
                        renderIcon={() => <Image style={styles.icon} source={require('../../../assets/appicon/search0.png')} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require('../../../assets/appicon/search.png')} />}
                        onPress={() => this.setState({ selectedTab: 'Search' })}>
                        <Search />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Contact'}
                        title="Contact"
                        renderIcon={() => <Image style={styles.icon} source={require('../../../assets/appicon/contact0.png')} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require('../../../assets/appicon/contact.png')} />}
                        onPress={() => this.setState({ selectedTab: 'Contact' })}>
                        <Contact />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    icon : {
        height: 24,
        width: 24
    }
})
export default Shop;