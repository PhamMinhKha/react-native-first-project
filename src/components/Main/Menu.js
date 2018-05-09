import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Image, Dimensions } from 'react-native';
import global from '../global';
import getToken from '../../api/getToken';
import saveToken from '../../api/saveToken';

const { height } = Dimensions.get('window');

class Menu extends Component {
    constructor(props){
        super(props);
        this.state={
            isLogin: false
        }
        global.onSignIn = this.onSignIn.bind(this);
    }
    componentDidMount(){
        const token = getToken('@token');
        console.log('token here --------------------');
        console.log(token);
        console.log('token here --------------------');
    }
    onSignOut()
    {
        this.setState({
            isLogin: null
        });
        saveToken('');

    }
    onSignIn(user){
        console.log('====================================');
        console.log(user);
        console.log('====================================');
        this.setState({
            isLogin: user
        });
    }
    openMenu() {
        alert('123');
    }
    change() {
        return this.props.changeNavigator('12');
    }
    render() {
        const { container, profileIcon, button, text } = styles;
        const logoutJSX = (
            <View>
                <TouchableOpacity style={button} onPress={() => this.props.navigation.navigate('Authentication')} navigation = {this.props.navigation}>
                    <Text style={text}>Sign In</Text>
                </TouchableOpacity>
            </View>
        );
        const loginJSX = (
            <View>
            <Text style={{ color: '#fff'}}>{this.state.isLogin !== null ? this.state.isLogin.name : ''}</Text>
            <View>
                <TouchableOpacity style={button} onPress={() => this.props.navigation.navigate('ChangeInfo')} navigation={this.props.navigation}>
                    <Text style={text}>Change Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button} onPress={() => this.props.navigation.navigate('OrderHistory')}>
                    <Text style={text}>Order History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button} onPress={this.onSignOut.bind(this)}>
                    <Text style={text}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            </View>
        );
        const mainJSX = this.state.isLogin ? loginJSX : logoutJSX;
        return (
            <View style={container}>
                <Image source={require('../../assets/temp/profile.png')} style={profileIcon} />
                {mainJSX}
                <View style={{ flex: 1, }}>
                    <Button
                        onPress={() => this.props.navigation.navigate('OrderHistory')}
                        title="Go to notifications"
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34B089',
        borderRightWidth: 3,
        borderColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: height / 8

    },
    profileIcon: {
        height: 100,
        width: 100,
        borderRadius: 30,
    },
    button: {
        marginTop: 20,
        backgroundColor: "#fff",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        borderRadius: 10
    },
    text: {
        color: '#34B089',
    }
})
export default Menu;
