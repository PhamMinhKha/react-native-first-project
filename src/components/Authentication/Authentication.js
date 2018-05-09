import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import register from '../../api/register';
import signIn from '../../api/signIn';
import global from '../global';
import saveToken from '../../api/saveToken';
import getToken from '../../api/getToken';

export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsSignIn: true,
            name: '',
            email: '',
            password: '',
            repassword: ''
        }
    }
    onRegister() {
        const { name, email, password } = this.state;
        register(email, name, password).then(json => {
            if (json === 'THANH_CONG') {
                this.setState({
                    IsSignIn: true
                })
            }
        });
    }
    componentDidMount(){
        const token = getToken().then(a => {
            console.log('aaaa', a);
            return a
        });
        console.log('token here --------------------');
        console.log(token);
        console.log('token here --------------------');
    }
    onLogin() {
        const { email, password } = this.state;
        signIn(email, password).then(res => {
            global.onSignIn(res.user)
            saveToken(res.token);
            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            console.log(res.token);
            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        }
        ).catch(err => console.log(err));
        this.props.navigation.goBack();
    }
    signIn() {
        this.setState({ IsSignIn: true });
    }
    signUp() {
        this.setState({ IsSignIn: false });
    }
    render() {
        const SingInJSX = (
            <View style={styles.content}>
                <TextInput value={this.state.email} onChangeText={text => this.setState({ email: text })} style={styles.textinput} placeholder='Nhập tài khoản' underlineColorAndroid='transparent' />
                <TextInput value={this.state.password} onChangeText={text => this.setState({ password: text })} style={styles.textinput} secureTextEntry={true} placeholder='Mật Khẩu' underlineColorAndroid='transparent' />
                <TouchableOpacity style={styles.button} onPress={() => this.onLogin()}>
                    <Text style={styles.textSignIn}>Sign In</Text>
                </TouchableOpacity>
            </View>
        );
        const SingUpJSX = (
            <View style={styles.content}>
                <TextInput value={this.state.name} onChangeText={text => this.setState({ name: text })} style={styles.textinput} placeholder='Nhập Name' underlineColorAndroid='transparent' />
                <TextInput value={this.state.email} onChangeText={text => this.setState({ email: text })} style={styles.textinput} placeholder='Nhập Email' underlineColorAndroid='transparent' />
                <TextInput value={this.state.password} onChangeText={text => this.setState({ password: text })} style={styles.textinput} secureTextEntry={true} placeholder='Mật Khẩu' underlineColorAndroid='transparent' />
                <TextInput value={this.state.repassword} onChangeText={text => this.setState({ repassword: text })} style={styles.textinput} secureTextEntry={true} placeholder='Nhập Lại Mật Khẩu' underlineColorAndroid='transparent' />
                <TouchableOpacity style={styles.button} onPress={this.onRegister.bind(this)}>
                    <Text style={styles.textSignIn}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
        const mainJSX = this.state.IsSignIn ? SingInJSX : SingUpJSX;
        return (
            <View style={styles.wrapper}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image source={require('../../assets/appicon/back_white.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.textTitle}>Wearing A Dress</Text>
                    <Image source={require('../../assets/appicon/ic_logo.png')} style={styles.icon} />
                </View>
                {mainJSX}
                <View style={styles.botBar}>
                    <TouchableOpacity style={styles.button1} onPress={() => this.signIn()}>
                        <Text style={this.state.IsSignIn ? styles.isActive : styles.unActive}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={() => this.signUp()}>
                        <Text style={!this.state.IsSignIn ? styles.isActive : styles.unActive}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    textSignIn: {
        color: '#fff'
    },
    isActive: {
        color: '#34B089'
    },
    unActive: {
        color: 'gray'
    },
    button1: {
        backgroundColor: '#fff',
        height: 40,
        width: '40%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderRightWidth: 2,
        borderColor: '#34B089',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button2: {
        backgroundColor: '#fff',
        height: 40,
        width: '40%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderLeftWidth: 2,
        borderColor: '#34B089',
        justifyContent: 'center',
        alignItems: 'center'
    },
    botBar: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        height: 40,
        width: '80%',
        backgroundColor: '#34B089',
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textinput: {
        height: 40,
        width: '80%',
        backgroundColor: '#fff',
        padding: 0,
        paddingLeft: 10,
        borderRadius: 20,
        fontSize: 16,
        marginTop: 10
    },
    content: {
        // paddingTop:200,
        alignItems: 'center'
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#34B089',
        padding: 10,
        justifyContent: 'space-between'
    },
    icon: {
        height: 20,
        width: 20
    },
    textTitle: {
        color: "#fff",
        fontSize: 18
    }
})