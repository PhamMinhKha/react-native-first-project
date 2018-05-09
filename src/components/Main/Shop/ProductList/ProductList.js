import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ListView, RefreshControl } from "react-native"
import getListProduct from '../../../../api/getListProduct';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      refreshing: false,
      page: 1,
      rawdata:[]
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const idType = navigation.getParam('idType');
    getListProduct(idType, 1)
      .then(arrProduct => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(arrProduct),
          rawdata: arrProduct
        })
        console.log('====================================');
        console.log(arrProduct);
        console.log('====================================');
      })
      .catch(err => console.log(err));
  }
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title');
    const idType = navigation.getParam('idType');
    const { topText, topWrapper, icon, wrapper, content, productImage, productContent, productWrapper } = styles;
    return (
      <View style={wrapper}>
        <View style={topWrapper}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={require('../../../../assets/appicon/backList.png')} style={icon} />
            <Text style={topText}>{title}</Text>
            <View></View>
          </TouchableOpacity>
        </View>
        <ListView
          contentContainerStyle={content}
          dataSource={this.state.dataSource}

          enableEmptySections={true}
          renderRow={(row) => (
            <View style={productWrapper}>
              <Image source={{ uri: `http://192.168.56.1/webservice/app/images/product/${row.images[0]}` }} style={productImage} resizeMode="contain" />
              <View style={productContent}>
                <Text style={styles.detailName}>{row.name}</Text>
                <Text style={styles.detailPrice}>${row.price}</Text>
                <Text>{row.material}</Text>
                <View style={styles.detailColorWrapper}>
                  <Text>{row.color}</Text>
                  <Text style={styles.circleText}></Text>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetail', {
                    product: row
                  })}>
                    <Text>View Detail</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>)

          }
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({
                  refreshing: true
                });
                const newPage = this.state.page + 1;
                getListProduct(idType, newPage)
                  .then(arrProduct => {
                    arrProduct = arrProduct.concat(this.state.rawdata);
                    console.log('====================================');
                    console.log(arrProduct);
                    console.log('====================================');
                    this.setState({
                      dataSource: this.state.dataSource.cloneWithRows(arrProduct),
                      refreshing: false
                    })
                  });
                }}
            />
          }
        >
        </ListView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  circleText: {
    height: 20,
    width: 20,
    backgroundColor: 'blue',
    borderRadius: 10
  },
  detailColorWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  detailName: {
    color: 'silver',
    marginTop: 5,
    marginBottom: 5
  },
  detailPrice: {
    color: 'purple',
    marginTop: 5,
    marginBottom: 5
  },
  productWrapper: {
    flexDirection: 'row',
    padding: 5,
  },
  productImage: {
    flex: 1,
    height: 113,
    width: 90
  },
  productContent: {
    flex: 2,
    paddingLeft: 5
  },
  wrapper: {
    padding: 10,
    backgroundColor: 'silver',
    flex: 1
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'silver',
    paddingBottom: 10,
  },
  topText: {
    color: 'purple',
    fontSize: 16
  },
  icon: {
    width: 25,
    height: 25
  },
  content: {
    backgroundColor: '#fff',
    padding: 10
  }
})
