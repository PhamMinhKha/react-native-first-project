import React, { Component } from 'react';
import { 
    View, Text, TouchableOpacity, ScrollView, 
    Dimensions, StyleSheet, Image, ListView 
} from 'react-native';
import global from '../../../global';


function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

class CartView extends Component {
    
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows([]),
        };
      }
    incrQuantity(id) {
        global.incrQuantity(id);
    }
    decQuantity(id) {
        global.decQuantity(id);
    }
    removeProduct(id){
        global.removeProduct(id);
    }
    gotoDetail() {
        const { navigator } = this.props;
        navigator.push({ name: 'PRODUCT_DETAIL' });
    }
    componentWillMount(){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.props.cartArray)
        })
    }
    componentWillReceiveProps(nextProps){
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        console.log(nextProps);
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.cartArray)
        })
    }
    componen
    render() {
       
        const { main, checkoutButton, checkoutTitle, wrapper,
        product, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct, 
            txtShowDetail, showDetailContainer } = styles;
            const {cartArray} = this.props;
            const arrTotal = cartArray.map(e => e.product.price * e.quantity);
            const total = arrTotal.length ? arrTotal.reduce((a,b) => a+b) : 0;
        return (
            <View style={wrapper}>
                <ListView 
                    enableEmptySections
                     dataSource={this.state.dataSource}
                     renderRow={(cartItem) =>(
                    <View style={product}>
                        <Image source={{uri: `http://192.168.56.1/webservice/app/images/product/${cartItem.product.images[0]}`}} style={productImage} />
                        <View style={[mainRight]}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={txtName}>{toTitleCase(cartItem.product.name)}</Text>
                                <TouchableOpacity>
                                    <Text style={{ fontFamily: 'Avenir', color: '#969696' }} onPress={() => this.removeProduct(cartItem.product.id)}>X</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={txtPrice}>{cartItem.product.price}$</Text>
                            </View>
                            <View style={productController}>
                                <View style={numberOfProduct}>
                                    <TouchableOpacity onPress={() => this.incrQuantity(cartItem.product.id)}>
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                    <Text>{cartItem.quantity}</Text>
                                    <TouchableOpacity onPress={() => this.decQuantity(cartItem.product.id)}>
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={showDetailContainer}>
                                    <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                     )}/>
                
                <TouchableOpacity style={checkoutButton}>
                    <Text style={checkoutTitle}>TOTAL {total}$ CHECKOUT NOW</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#DFDFDF'
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#2ABB9C',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    product: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default CartView;