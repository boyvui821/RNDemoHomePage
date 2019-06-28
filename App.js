/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  RefreshControl
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const S_WIDTH = Dimensions.get('window').width
const arrow_r = require('./src/images/arrow_right.png')
const bell = require('./src/images/bell.png')
const avatar = require('./src/images/avatar.png')

export default class App extends Component {

  constructor(props) {
    super(props)

    this._renderItem = this._renderItem.bind(this)
    this._renderItemLoan = this._renderItemLoan.bind(this)
    this._renderItemEvent = this._renderItemEvent.bind(this)
    this.state = {
      entries: [
        {
          title: "Vay mua xe",
          amount: 40000000,
          date: "30/07/2019"
        }
      ],
      loans: [
        {
          amount: 111222333,
          title: "Vay cưới vợ",
          rate: 0.45
        }
      ],
      events: [
        {
          title: "Sở hữu ngay iphone XSMax với lãi suất chỉ 0%",
          description: "Từ nay đến 31/12 bạn sẽ có cơ hội sở hữu ngay iphone XSMAX với ưu đã lãi suất 0% của HDSAISON"
        }
      ],
      activeSlide: 0,
      isFetched: false,
      refreshing: false
    }
  }

  _apiEntries() {
    return new Promise((resolve, reject) => {
      fetch('https://my-json-server.typicode.com/boyvui821/myapi01/entries')
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson)
        })
        .catch((error) => {
          reject(error)
        });
    })
  }

  _apiLoans() {
    return new Promise((resolve, reject) => {
      fetch('https://my-json-server.typicode.com/boyvui821/myapi02/loans')
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson)
        })
        .catch((error) => {
          reject(error)
        });
    })
  }

  _apiEvents() {
    return new Promise((resolve, reject) => {
      fetch('https://my-json-server.typicode.com/boyvui821/myapi03/events')
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson)
        })
        .catch((error) => {
          reject(error)
        });
    })
  }

  onSuccess(user) { console.log(user) }
  onError(err) { console.error(error) }

  async callAPI() {
    const result = await Promise.all([this._apiEntries(), this._apiLoans(), this._apiEvents()])
    console.log(result)
    this.setState({
      entries: result[0],
      loans: result[1],
      events: result[2],
      isFetched: true,
      refreshing:false
    })
  }

  componentDidMount() {
    // this._apiEntries().then(this.onSuccess, this.onError)
    // this._apiLoans().then(this.onSuccess, this.onError)
    // this._apiEvents().then(this.onSuccess, this.onError)

    this.callAPI()
  }


  _renderItem({ item, index }) {

    return (


      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 150,
        paddingLeft: 20,
        marginTop: 20,
        shadowOpacity: 1.0,
        shadowColor: '#e0e0e0',
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 }
      }}>
        <ShimmerPlaceHolder
          autoRun={true}
          visible={this.state.isFetched}
          style={{ height: 20, marginBottom: 10 }}>
          <Text style={styles.item_title_text}>{item.title}</Text>
        </ShimmerPlaceHolder>

        <ShimmerPlaceHolder
          autoRun={true}
          visible={this.state.isFetched}
          style={{ height: 20, marginBottom: 10 }}>
          <Text style={styles.item_amount_text}>{item.amount}</Text>
        </ShimmerPlaceHolder>

        <ShimmerPlaceHolder
          autoRun={true}
          visible={this.state.isFetched}
          style={{ height: 20, marginBottom: 10 }}>
          <Text style={styles.item_date_text}>Ngày đến hạn tiếp theo: {item.date}</Text>
        </ShimmerPlaceHolder>
      </View>

    );
  }

  _renderItemLoan({ item, index }) {

    return (
      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 10,
        height: 150,
        paddingLeft: 20,
        marginTop: 20,
        shadowOpacity: 1.0,
        shadowColor: '#e0e0e0',
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: 'white'
      }}>

        <ShimmerPlaceHolder
          autoRun={true}
          visible={this.state.isFetched}
          style={{ height: 20, marginBottom: 10 }}>
          <Text style={styles.item_amount_text}>{item.amount}</Text>
        </ShimmerPlaceHolder>

        <ShimmerPlaceHolder
          autoRun={true}
          visible={this.state.isFetched}
          style={{ height: 20, marginBottom: 10 }}>
          <Text style={styles.item_title_text}>{item.title}</Text>
        </ShimmerPlaceHolder>

        <ShimmerPlaceHolder
          autoRun={true}
          visible={this.state.isFetched}
          style={{ height: 20, marginBottom: 10 }}>
          <Text style={[styles.item_date_text, { marginBottom: 30 }]}>Lãi suất ưu đãi: {item.rate}%</Text>
        </ShimmerPlaceHolder>

        <View style={{
          position: 'absolute',
          left: 0,
          height: 40,
          right: 0,
          bottom: 0,
          borderTopWidth: 0.5,
          borderColor: '#bdbdbd',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
          <Image source={arrow_r} style={{ width: 20, height: 20 }}></Image>
        </View>
      </View>
    );
  }
  _renderItemEvent({ item }) {
    return (
      <View style={styles.item_event_container}>
        <View style={styles.item_event_sub_con}>
          <ShimmerPlaceHolder
            autoRun={true}
            visible={this.state.isFetched}
            style={{ height: 20, marginBottom: 10 }}>
            <Text style={styles.item_event_title}>{item.title}</Text>
          </ShimmerPlaceHolder>

          <ShimmerPlaceHolder
            autoRun={true}
            visible={this.state.isFetched}
            style={{ height: 20, marginBottom: 10 }}>
            <Text>{item.description}</Text>
          </ShimmerPlaceHolder>


        </View>

      </View>
    )
  }

  get pagination() {
    const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{ width: 10 }}
        dotStyle={{
          width: 15,
          height: 15,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'white'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  _onRefresh=()=>{
    console.log("_onRefresh")
    this.setState({ refreshing: true, isFetched:false })
    this.callAPI()
  }

  _refreshControl(){

    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
        title="Loading..."
      />
    );
  }
    

  render() {

    

    // var x = 1000;
    // x = x.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    // console.log(x);

    return (

      <SafeAreaView style={{ flex: 1, backgroundColor: '#ff1744' }}>
        <View style={styles.header_container}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableHighlight style={{ backgroundColor: '#e0e0e0', borderRadius: 25 }}>
              <Image source={avatar} style={styles.header_avatar}></Image>
            </TouchableHighlight>

            <Text style={styles.header_name}>Gia Các Lượng</Text>
          </View>


          <TouchableOpacity>
            <Image source={bell} style={styles.header_bell}></Image>
          </TouchableOpacity>

        </View>
        <ScrollView
          style={styles.scroll_container}
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          refreshControl={
            this._refreshControl()
            // <RefreshControl
            //   refreshing={this.state.refreshing}
            //   onRefresh={this._onRefresh.bind(this)}
            //   title="Loading..."
            // />
          }
        >

          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.entries}
            renderItem={this._renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width - 80}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
            containerCustomStyle={{ flexGrow: 0, height: 200 }}
            autoplay={true}
            loop={true}
          />

          {this.pagination}

          <View style={styles.menu_container}>
            <View style={styles.sub_menu_container}>
              <ShimmerPlaceHolder
                autoRun={true}
                visible={this.state.isFetched}
                style={{ height: 50, width: 50, borderRadius: 50 / 2, marginBottom: 10 }}>
                <Image
                  style={styles.menu_image}
                  source={require('./src/images/menu_01.png')} />
              </ShimmerPlaceHolder>

              <ShimmerPlaceHolder
                autoRun={true}
                visible={this.state.isFetched}
                style={{ height: 50, width: 50, borderRadius: 50 / 2, marginBottom: 10 }}>
                <Image
                  style={styles.menu_image}
                  source={require('./src/images/menu_02.png')} />
              </ShimmerPlaceHolder>

              <ShimmerPlaceHolder
                autoRun={true}
                visible={this.state.isFetched}
                style={{ height: 50, width: 50, borderRadius: 50 / 2, marginBottom: 10 }}>
                <Image
                  style={styles.menu_image}
                  source={require('./src/images/menu_03.png')} />
              </ShimmerPlaceHolder>

              <ShimmerPlaceHolder
                autoRun={true}
                visible={this.state.isFetched}
                style={{ height: 50, width: 50, borderRadius: 50 / 2, marginBottom: 10 }}>
                <Image
                  style={styles.menu_image}
                  source={require('./src/images/menu_04.png')} />
              </ShimmerPlaceHolder>
            </View>

            <View style={styles.sub_menu_container}>

              <ShimmerPlaceHolder
                autoRun={true}
                visible={this.state.isFetched}
                style={{ height: 50, width: 50, borderRadius: 50 / 2, marginBottom: 10 }}>
                <Image
                  style={styles.menu_image}
                  source={require('./src/images/menu_05.png')} />
              </ShimmerPlaceHolder>

              <ShimmerPlaceHolder
                autoRun={true}
                visible={this.state.isFetched}
                style={{ height: 50, width: 50, borderRadius: 50 / 2, marginBottom: 10 }}>
                <Image
                  style={styles.menu_image}
                  source={require('./src/images/menu_06.png')} />
              </ShimmerPlaceHolder>

              <ShimmerPlaceHolder
                autoRun={true}
                visible={this.state.isFetched}
                style={{ height: 50, width: 50, borderRadius: 50 / 2, marginBottom: 10 }}>
                <Image
                  style={styles.menu_image}
                  source={require('./src/images/menu_07.png')} />
              </ShimmerPlaceHolder>

              <ShimmerPlaceHolder
                autoRun={true}
                visible={this.state.isFetched}
                style={{ height: 50, width: 50, borderRadius: 50 / 2, marginBottom: 10 }}>
                <Image
                  style={styles.menu_image}
                  source={require('./src/images/menu_08.png')} />
              </ShimmerPlaceHolder>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: S_WIDTH - 40
            }}>


            <ShimmerPlaceHolder
              autoRun={true}
              visible={this.state.isFetched}
              style={{ width: 200, height: 20 }}>
              <Text style={styles.group_title_text}>Khoản vay dành cho bạn</Text>
            </ShimmerPlaceHolder>

            <TouchableOpacity>
              <ShimmerPlaceHolder
                autoRun={true}
                visible={this.state.isFetched}
                style={{ width: 80, height: 20 }}>
                <Text style={styles.underline}>Xem thêm</Text>
              </ShimmerPlaceHolder>

            </TouchableOpacity>
          </View>

          {/* Caroul 2 */}
          <Carousel
            ref={(c) => { this._carousel02 = c; }}
            data={this.state.loans}
            renderItem={this._renderItemLoan}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width - 80}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
            containerCustomStyle={{ flexGrow: 0, height: 180 }}
          />

          <View style={styles.header_event_container}>
            <ShimmerPlaceHolder autoRun={true} visible={this.state.isFetched}>
              <Text style={styles.group_title_text}>Khuyến mãi</Text>
            </ShimmerPlaceHolder>
          </View>
          {/* Khuyến Mãi */}
          <FlatList
            data={this.state.events}
            renderItem={this._renderItemEvent}
            horizontal={true}
            pagingEnabled={true}
            style={{ marginBottom: 20 }}
          />

        </ScrollView>


      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ff1744',
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: S_WIDTH,
    height: 80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 15
  },
  header_avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  header_bell: {
    width: 30,
    height: 30
  },
  header_name: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20
  },
  scroll_container: {
    flex: 1,
    backgroundColor: '#ff1744'
  },
  item_image: {
    width: 300,
    height: 300
  },
  item_title_text: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10
  },
  item_amount_text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ff1744',
    marginBottom: 10
  },
  item_date_text: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  menu_container: {
    width: S_WIDTH - 40,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    shadowOpacity: 1.0,
    shadowColor: '#bdbdbd',
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: 'white',
  },
  sub_menu_container: {
    flexDirection: 'row',
    width: S_WIDTH - 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menu_image: {
    width: 50, height: 50
  },
  group_title_text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  },
  underline: {
    textDecorationLine: 'underline',
    color: 'white'
  },
  header_event_container: {
    width: S_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 20
  },
  item_event_container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: S_WIDTH - 80,
    height: 150,
    marginRight: 10,
    paddingLeft: 20
  },
  item_event_sub_con: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#f44336',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    shadowOpacity: 1.0,
    shadowColor: '#bdbdbd',
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: 'white'
  },
  item_event_title: {
    fontSize: 15,
    color: '#ff1744',
    fontWeight: 'bold',
    marginBottom: 10
  }

});
