import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
// import drawerNavigator from '../../Assects/Images/Drawer';
import Header from '../../Component/Header';
import {SliderBox} from 'react-native-image-slider-box';

const Details = () => {
  const [isActive, setIsActive] = useState('');
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [fixbanners, setFixbanners] = useState([]);
  const [nestedlist, setNestedlist] = useState([]);
  const [bestseller, setBestseller] = useState([]);
  const [nestedseller, setNestedseller] = useState([]);
  const [liked, setliked] = useState(false);

  // const images = [
  //   require('../../Assects/Images/biriyani.jpg'),
  //   require('../../Assects/Images/breakfast.jpg'),
  //   require('../../Assects/Images/lunch.jpg'),
  // ]
  const [bannerimg, setbannerimg] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [imgarr, setImgarr] = useState([]);
  const [allproducts, setAllproducts] = useState([]);

  useEffect(() => {
    apicall();
    apicallproduct();
  }, []);

  const apicall = async () => {
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/homepage',
      );
      // console.log(response);
      const json = await response.json();

      setData(json);
      console.log(json.homeFixBanners, 'dataaaa');
      // json.homeFixBanners.map(item => {
      //   // console.log(item.image, 'only------------');
      // });

      if (json?.homeSliderBanners) {
        let arrayModified = [];

        json?.homeSliderBanners?.map(items => {
          arrayModified.push(items.image);
        });

        // console.log(arrayModified, 'Lingaraj');
        setbannerimg(arrayModified);
        setRefresh(!refresh);
      }
     
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  // console.log(data, '....len');
 

  const fixbannerflatlist = ({item, index}) => (
    <View style={{marginHorizontal: 10, marginVertical: 10}}>
      <TouchableOpacity
        onPress={() => {
          console.log(item.id,'---------------------------------------');
          navigation.navigate('Newarrival', {id: item.id, title: item.title});
          console.log(item);
        }}
        style={{
          height: 75,
          width: 75,
          borderRadius: 80,
          backgroundColor: 'gray',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <Image
            source={{uri: item.image}}
            style={{
              width: 70,
              height: 70,
              borderRadius: 70,
              alignSelf: 'center',
            }}
          />
        </View>
      </TouchableOpacity>
      <View>
        <Text style={{fontSize: 16, fontWeight: '800', color: 'black'}}>
          {item.alt}
        </Text>
      </View>
    </View>
  );
  const apicallproduct = async () => {
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/products',
      );

      const json = await response.json();
      // console.log(json.data[4].data,'-------->>>>>>>>.Newarrival Product')
      setAllproducts(json.data[4].data);
      json.data[4].data.map(item => {
        // console.log(item.images,'--------------------All Products')
      });

      json.data[1].data.map(item => {
        // console.log(item.images,'........ImageNewAArival')
        setImgarr(item);
      });
      // console.log(imgarr,'image array')

      setBestseller(json.data[0].data);
      json.data[0].data.map(item => {
        // console.log(item.images,'............uuuu');
        setNestedseller(item.images.small);
      });

      json.data.map(item => {
        // console.log(item.data,'............uuuu');
        item.data.map(a => {
          // console.log(a.images);
          setNestedlist(a.images);
        });
      });

      json?.data.map(product => {
        setFixbanners(product.data);
        // console.log(fixbanners, ',,,,,,,,,,productdata');
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const productflatlist = ({item, index}) => (
    <TouchableOpacity
      style={{
        marginHorizontal: 10,
      }}
      onPress={()=>{navigation.navigate('BuyNow',{id:item.id})}}
      // onPress={()=>console.log(item.id,'-----------error')}
      >
      <View>
        <Image
          source={{uri: item.images.small}}
          style={{width: 80, height: 80, alignSelf: 'center'}}
        />
      </View>
      <Text style={{color: 'black', fontWeight: '800'}}>
        {item.product_name}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>Price</Text>
        <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
          {' '}
          ${item.product_price}
        </Text>
      </View>
    </TouchableOpacity>
    
  );

  // const allproductflatlist = ({item, index}) => (
  //   <View
  //     style={{
  //       marginHorizontal: 10,
  //       // justifyContent:'space-around'
  //     }}>
  //     <View>
  //       <Image
  //         source={{uri: item.images.small}}
  //         style={{
  //           width: 100,
  //           height: 120,
  //           alignSelf: 'flex-start',
  //           borderWidth: 1,
  //           marginTop: 20,
  //         }}
  //       />
  //     </View>
  //     <Text style={{color: 'black', fontWeight: '800', fontSize: 18}}>
  //       {item.product_name}
  //       {/* {console.log(item.product_name,'flatlist-product')} */}
  //     </Text>
  //     <View style={{flexDirection: 'row'}}>
  //       <Text style={{color: 'black', fontWeight: 'bold'}}>Price</Text>
  //       <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
  //         {' '}
  //         ${item.product_price}
  //       </Text>
  //     </View>
  //   </View>
  // );

  const allproductflatlist = ({item, index}) => (
    <View style={{alignItems: 'center', marginLeft: 0, width: '44%'}}>
      <View style={styles.NewArrivalproduct}>
        {liked ? (
          <View
            style={{
              alignSelf: 'flex-end',
              height: 27,
              width: 27,
              borderRadius: 27,
              backgroundColor: '#FF5900',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign
              name="heart"
              size={15}
              color="white"
              // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
              onPress={() => {
                // if (index) {
                setliked(!liked);
                // }
                // console.log('pressed');
              }}
              // style={{marginRight:10,marginVertical:10}}
            />
          </View>
        ) : (
          <View
            style={{
              alignSelf: 'flex-end',
              height: 27,
              width: 27,
              borderRadius: 27,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign
              name="heart"
              size={15}
              color="#FF5900"
              // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
              // onPress={() => navigation.goBack()}
              // style={{marginRight:10,marginVertical:10}}
              onPress={() => {
                setliked(!liked);

                // console.log('pressed');
              }}
            />
          </View>
        )}

        <TouchableOpacity>
          <Image
            source={{uri: item.images.small}}
            style={styles.NewArrivalproductimage}
          />

        </TouchableOpacity>
      </View>
      <View style={{alignSelf: 'flex-start'}}>
        <View>
          <Text
            style={{
              //  color: 'black',
              fontSize: 18,
              margin: '2%',
              fontWeight: '500',
            }}>
            {item.product_name}
          </Text>
        </View>
        <View style={styles.priceholder}>
          <Text
            style={{
              // color: 'black',
              fontSize: 16,
              margin: '2%',
              marginRight: 15,
              fontWeight: '600',
            }}>
            ${item.product_price}
          </Text>
        </View>
      </View>
    </View>
  );
  const nestedbestseller = ({item}) => (
    <View>
      <Image
        source={{uri: item}}
        style={{
          width: 80,
          height: 80,
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: 'black',
        }}
      />
    </View>
  );

  // const bestsellerflatlist = ({item, index}) => (
  //   <View
  //     style={{
  //       marginHorizontal: 10,
  //     }}>
  //     <FlatList
  //       horizontal
  //       data={nestedseller}
  //       renderItem={nestedbestseller}
  //       keyExtractor={(item, index) => index.toString()}
  //       style={{alignSelf: 'center'}}
  //     />
  //     <Text style={{color: 'black', fontWeight: '800'}}>
  //       {item.product_name}
  //     </Text>
  //     <View style={{flexDirection: 'row'}}>
  //       <Text style={{color: 'black', fontWeight: 'bold'}}>Price</Text>
  //       <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
  //         {' '}
  //         ${item.product_price}
  //       </Text>
  //     </View>
  //   </View>
  // );
  // console.log(allproducts, '.............all');

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header />
        <View
          style={{
            justifyContent: 'center',
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
          }}>
          <FlatList
            horizontal
            data={data.homeFixBanners}
            renderItem={fixbannerflatlist}
            keyExtractor={(item, index) => index.toString()}
            style={{alignSelf: 'center'}}
          />
        </View>
        {Array.isArray(bannerimg) && bannerimg.length ? 
        (
          <View>
            <SliderBox
              images={bannerimg}
              sliderBoxHeight={300}
              paginationBoxVerticalPadding={20}
              paginationBoxStyle={{
                position: 'absolute',
                bottom: 0,
                padding: 0,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
              }}
              autoplay
              circleLoop
              autoplayInterval={4000}
              resizeMode="stretch"
            />
          </View>
        ) 
        : (
          <View>
            <Text>LOading</Text>
          </View>
        )}

        <View
          style={{
            alignItems: 'center',
            marginTop: 15,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            paddingBottom: 10,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 24, color: 'black'}}>
            Shop By Deals
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: 'grey',
              fontStyle: 'italic',
            }}>
            Browse Favourite Deals
          </Text>
        </View>

        <View style={{marginTop: 10}}>
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 24,
                color: 'black',
                textDecorationLine: 'underline',
              }}>
              {''}New Arrivals
            </Text>
          </View>
          <FlatList
            horizontal
            data={fixbanners}
            renderItem={productflatlist}
            keyExtractor={(item, index) => index.toString()}
            style={{alignSelf: 'center', marginTop: 10}}
          /> 
          
        </View> 

        <View style={{marginTop: 20}}>
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={{fontWeight: '700', fontSize: 28, color: 'black',textDecorationLine:'underline'}}>
              All Products
            </Text>
          </View>
          <View style={{justifyContent: 'space-around'}}>
            <FlatList
              // horizontal
              // contentContainerStyle={{gap: 10}}
              // columnWrapperStyle={{gap: 10}}
              numColumns={2}
              data={allproducts}
              // data={[1,2,3,4,5]}
              renderItem={allproductflatlist}
              keyExtractor={(item, index) => index.toString()}
              // style={{alignSelf: 'center', marginTop: 10}}
            />
          </View>
        </View>
        {/* <View style={{marginTop: 10}}>
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={{fontWeight: 'bold', fontSize: 24, color: 'black'}}>
            BestSeller
            </Text>
          </View>
          <FlatList
            horizontal
            data={bestseller}
            renderItem={bestsellerflatlist}
            keyExtractor={(item, index) => index.toString()}
            style={{alignSelf: 'center', marginTop: 10}}
          />
        </View>  */}
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headercontainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '98%',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },

  headerpaging: {
    // flex: 1,
    // backgroundColor: 'pink',
    width: '98%',
    justifyContent: 'space-between',
    padding: 10,
    // alignItems: 'center',
    // alignSelf: 'center',
    marginTop: 10,
  },
  headerpaging1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 25,
    //backgroundColor:'blue',
    textAlign: 'center',
    marginTop: 6,
    alignItems: 'center',
  },
  headerpaging1a: {
    // sbackgroundColor:'black',
    borderWidth: 3,
    borderRadius: 40,
    height: 40,
    width: 40,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 2,
    borderColor: '#C334F8',
    justifyContent: 'space-around',
    // marginRight:20
    // backgroundColor:'red'
  },
  num: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  meal: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    marginLeft: 10,
  },
  imgbox: {
    alignItems: 'center',
    width: 120,
    height: 120,
    borderWidth: 0,
    borderColor: '#000',
    borderRadius: 10,
    elevation: 20,
    shadowColor: '#52006A',
    backgroundColor: 'white',
    marginRight: 10,
  },
  boxcontainer: {
    marginLeft: 10,
    justifyContent: 'space-between',
    marginTop: 30,
  },
  boxcontainer1: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 25,
  },
  tinyLogo: {
    height: 60,
    width: 60,
    marginTop: 13,
  },
  popular: {
    marginTop: '40',
    justifyContent: 'space-between',
    alignItems: 'center',
    //alignSelf: 'center',
    flexDirection: 'row',
  },
  popularorder: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth: 0,
    // borderColor: '#000',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#52006A',
    height: 135,
    marginTop: 30,
  },
  Popularimg: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  popularorderdetails: {
    //flexDirection:'row'
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    marginRight: 15,
  },
  mybutton: {
    borderColor: '#C334F8',
    borderRadius: 30,
    borderWidth: 3,
    padding: 7,
    width: '70%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: '#000',
    borderRadius: 10,
    elevation: 20,
    shadowColor: '#52006A',
    height: 60,
    padding: 10,
    marginTop: 30,
  },
  item: {
    //backgroundColor: 'pink',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth: 0,
    // borderColor: '#000',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#52006A',
    height: 135,
    marginTop: 30,
  },
  categotystyle: {
    backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  NewArrivalproduct: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    marginVertical: 15,
    borderRadius: 10,
    padding: 5,
  },
  NewArrivalproductimage: {
    width: '80%',
    height: 180,
    alignSelf: 'center',
    // backgroundColor: 'red',
    // marginVertical: 15,
    borderRadius: 15,
  },
});
