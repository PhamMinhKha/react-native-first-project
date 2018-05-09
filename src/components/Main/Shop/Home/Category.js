import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const { height, width } = Dimensions.get('window');

class Category extends Component {
    render() {
        const { wrapper, text,  imageStyle } = styles;

        const {types} = this.props;

       
        return (
           <View style={wrapper}>
                <View style={{ flex:1 }}>
                    <Text style={text}>The Category</Text>
                </View>
                <View style={{ flex:4 }}>
                <Swiper height={imageHeight} width={imageWidth} showsPagination={true} showsButtons={true}>
                    { types.map(e => (
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ProductList',{title : e.name, idType: e.id})}>
                        <View style={{position: 'relative'}} key={e.id}>
                        <Image source={{uri:`http://192.168.2.109/webservice/app/images/type/${e.image}`}} style={imageStyle}/> 
                        <Text style={styles.cateText}>{e.name}{`http://192.168.2.109/webservice/app/images/type/${e.image}`}</Text>
                        </View>
                        </TouchableOpacity>
                    ))}
                </Swiper>
                </View>
           </View>
        );
    }
}
//933 x 465
const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;
const styles = StyleSheet.create({
    wrapper: {
        height: height * 0.4,
        backgroundColor: "white",
        margin: 10,
        shadowColor: "black",
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.2,
        elevation: 5,
        padding: 10,
        paddingTop: 0
    },
    text: {
        fontSize:16,
        color: "gray"
    },
    imageStyle: {
        height: imageHeight,
        width: imageWidth,
        // justifyContent: "center",
        // alignItems: "center",
 
    },
    cateText: {
        fontSize: 20,
        color:"red",
        // alignItems: "center",
        position: 'absolute',
        left: '50%',
        top: '50%'
        // right: '50%'
    }
})
export default Category;