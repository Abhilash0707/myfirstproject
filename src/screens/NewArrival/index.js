import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Component/Header';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ratings from '../../Component/Header/Ratings';


const Newarrival = props => {
  const navigation = useNavigation();
  console.log(props.route.params);
  const [liked, setliked] = useState(false);
  const [radiobtn, setRadiobtn] = useState(false);
  const [listing, setListing] = useState([]);
  const [listingimage, setListingimage] = useState([]);
  const [modalVisible, SetModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filtercat, setFiltercat] = useState([]);
  const [maindataarray, setDataarray] = useState([])
  const [brand, setBrand] = useState([]);
  const [size, setSize] = useState([]);


  const [ratingarr, setRatingarr] = useState([
    {
      id: '5',
      oncheck: false,
    },
    {
      id: '4',
      oncheck: false,
    },
    {
      id: '3',
      oncheck: false,
    },

    {
      id: '2',
      oncheck: false,
    },

    {
      id: '1',
      oncheck: false,
    },
  ]);

  const toggleradiobtn = index => {
    let ratingdata = ratingarr;
    // console.log(radiobtn);
    if (ratingdata[index].oncheck) {
      ratingdata[index].oncheck = false;
      setRatingarr(ratingdata);
      setRadiobtn(!radiobtn);
    } else {
      ratingdata[index].oncheck = true;
      setRatingarr(ratingdata);
      setRadiobtn(!radiobtn);
    }
  };


  const checkbtn = (index) => {
    let filtercatdata = filtercat;
    // console.log(radiobtn);
    if (filtercatdata[index].oncheck) {
      filtercatdata[index].oncheck = false;
      setFiltercat(filtercatdata);
      setRadiobtn(!radiobtn);
    } else {
      filtercatdata[index].oncheck = true;
      setFiltercat(filtercatdata);
      setRadiobtn(!radiobtn);
    }
    console.log(filtercat, 'abhi');
  };


  const apicall = async () => {
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/filters',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            catId:  props.route.params.id,
          }),
        },
      );
      const json = await response.json();

      if (json.status === 1) {
        setDataarray(json)
        console.log(maindataarray, 'main-------')
        console.log(json.filters, 'sizefilter-------')
        console.log(json.brandfilter, 'brandfilter-------')
        setBrand(json.brandfilter?.data)
        console.log(json.brandfilter?.data,'00000000000---------00000000000-----------000000000');
        setFiltercat(json.filters)
        // setBrand(json.brandfilter?.data)


        setRadiobtn(!radiobtn);
      } else {
        Alert.alert(res.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const selectmyfilters = (filterName, item) => {
    console.log(filterName,'filtername--');
    setSelectedFilters((pre) => {
      //insert
      if(!pre[filterName]){
        pre[filterName] = [item];
        return pre;
      }else if (pre[filterName] && pre[filterName].indexOf(item) == -1){
        pre = {...pre, [filterName]: [...pre[filterName], item]};
      }else{
        // delete
        pre = {
          ...pre,
          [filterName]: pre[filterName].filter(value => value != item),
        };
      }
      return pre;
    });
  };


  
  const sizefiltertogglebtn = (index) => {

    console.log('Toggle button clicked for index:', index);
    let sizedata = brand;
    // console.log(radiobtn);
    if (sizedata[index].oncheck) {
      sizedata[index].oncheck = false;
      setSize(sizedata);
      setRadiobtn(!radiobtn);
    } else {
      sizedata[index].oncheck = true;
      setSize(sizedata);
      setRadiobtn(!radiobtn);
    }
    console.log(sizedata, 'brand');
  };
  console.log('Selected Filters:',JSON.stringify(selectedFilters) );

  const filterrendercatdata = ({ item, index }) => (
    // <View><Text>{item}</Text></View>
    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
      {filtercat[index].oncheck ? (
        <MaterialIcons
          name="radio-button-on"
          size={22}
          color="#281E87"
          // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}

          onPress={() => checkbtn(index, item)}
        />
      ) : (
        <MaterialIcons
          name="radio-button-off"
          size={22}
          color="#281E87"
          // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
          onPress={() => checkbtn(index, item)}
        />
      )}
      <View>
        <Text style={{ fontSize: 18, color: 'black', fontWeight: '600', marginLeft: '9%' }}>{item}</Text>
      </View>
    </View>
  )

  const hideMenu = () => {
    setVisible(false);
  };

  const buynow = (itemss, index) => {
    console.log(itemss.item.id,'itemss--->>')
    navigation.navigate('BuyNow',
      {id:itemss.item.id}
    // }
    
    );
  };
  useEffect(() => {
    apicall1()
    apicall();
   
  }, []);

  const apicall1 = async () => {
    try {
      const response = await fetch(
        'http://192.168.10.189/Project-4/public/api/listing',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            catId: props.route.params.id,
            request_from :'mob',
            brand:JSON.stringify([]),
            filters:JSON.stringify(selectedFilters) 

          }),
        },
      );

      const json = await response.json();
      console.log(json,'jjjjjjjjjjjjjsssssssssssssssoooooooooooooooonnnnnnnnnnnnnn---------------------');
      const myjsondata = json.data;
      setListing(myjsondata);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  // console.log(listing, 'listing---->>>');

  const filtercategory = ({item, index}) => (
    // console.log(item,'ooooooo')
    <>
      <View style={{flexDirection: 'row',marginTop:10}}>
        {item.oncheck ? (
          <MaterialIcons
            name="radio-button-on"
            size={22}
            color="#281E87"
            // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}

            onPress={() => sizefiltertogglebtn(index)}
          />
        ) : (
          <MaterialIcons
            name="radio-button-off"
            size={22}
            color="#281E87"
            // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
            onPress={() => sizefiltertogglebtn(index)}
          />
        )}
        <View >
          <Text style={{fontSize: 18, color: 'black',marginLeft:'9%'}}>{item.name}</Text>
        </View>
      </View>
    </>
  );
  const filterapi =()=>{
    apicall1()
    SetModalVisible(!modalVisible);
  }


  return (
    <View style={styles.container}>
  
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          SetModalVisible(!modalVisible);
        }}>
        {/* <View style={styles.centeredView}>
          <View style={styles.modalView}> */}
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.headercontainer}>
              <View style={{ flexDirection: 'row' }}>
                <AntDesign
                  name="arrowleft"
                  size={30}
                  color="black"
                  // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
                  onPress={() => SetModalVisible(!modalVisible)}
                />
                <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: '800' }}>
                  Sort & Filters
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  // width: '50%',
                  // justifyContent: 'space-around',  
                  alignItems: 'center',
                }}>
                <TouchableOpacity>
                  <Text
                    style={{
                      // marginLeft: 20,
                      fontSize: 16,
                      fontWeight: '600',
                      color: 'black',
                    }}>
                    Clear Filters
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#EBE7E6',
                // height: 125,
                justifyContent: 'center',
                // borderBottomWidth: 1,
                padding: 10
              }}>
              {/* <Text
                    style={{
                      marginLeft: '2%',
                      fontSize: 18,
                      color: 'black',
                      fontWeight: '600',
                    }}>
                    Sorting
                  </Text> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 10,
                }}>
                <TouchableOpacity style={styles.modalView}>
                  <Text style={styles.sortingprice}>Price</Text>
                  <Text style={styles.sortingprice}>Low to High</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalView}>
                  <Text style={styles.sortingprice}>Price</Text>
                  <Text style={styles.sortingprice}>Low to HIgh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalView}>
                  <Text style={styles.sortingprice}>Ratings</Text>
                  <Text style={styles.sortingprice}>High to low</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#EBE7E6' }}>
              <View>
                <Text
                  style={{
                    marginLeft: '2%',
                    fontSize: 20,
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  User ratings
                </Text>
              </View>

              <View style={{ marginTop: 10 }}>
                <FlatList
                  data={ratingarr}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: '2%',
                        marginTop: 10,
                        //  width: 130,
                        //  justifyContent: 'space-between',
                        //  backgroundColor:"pink"
                      }}>
                      {item.oncheck ? (
                        <MaterialIcons
                          name="radio-button-on"
                          size={22}
                          color="#281E87"
                          // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}

                          onPress={() => toggleradiobtn(index)}
                        />
                      ) : (
                        <MaterialIcons
                          name="radio-button-off"
                          size={22}
                          color="#281E87"
                          // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
                          onPress={() => toggleradiobtn(index)}
                        />
                      )}
                      <View style={{ marginLeft: 10 }}>
                        <Ratings data={item.id} />
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}

                />
              </View>
            </View>
            <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#EBE7E6' }}>
              <Text
                style={{
                  marginLeft: '2%',
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '600',
                }}>
                Brand
              </Text>
              <View style={{ marginLeft: '2%', marginTop: 10, marginBottom: 10 }}>
              <View style={{marginLeft:'2%',marginTop:10,marginBottom:10,backgroundColor:'red'}}>
            <FlatList
              data={brand}
              renderItem={filtercategory}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

                <>

                  {/* <Pressable onPress={()=>{
              selectmyfilters(item,index);
            }} style={{ flexDirection: 'row', marginTop: 10 }}>
              
                  <MaterialIcons
                  name="radio-button-on"
                  size={22}
                  color="#281E87"
                   onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
                />
              ): <MaterialIcons
              name="radio-button-off"
              size={22}
              color="#281E87"
              // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
             
            />}
             
              <View>
                <Text style={{ fontSize: 18, color: 'black', marginLeft: '9%' }}>{maindataarray.brandfilter.name}</Text>
              </View>
            </Pressable> */}


                  {maindataarray?.filters?.map((value) => {
                    console.log(value, 'values---');
                    return (
                      <View>
                        <Text>{value.name}</Text>
                        <FlatList
                          data={value.data}
                          renderItem={({ item,index }) => (
                            <Pressable style={{ flexDirection: 'row', marginTop: 10,padding:10,alignItems:'center',width:'95%' ,alignSelf:'center'}} onPress={() => {
                              selectmyfilters(value.name,item);
                            }}>

                              <MaterialIcons
                                name={
                                  selectedFilters[value.name]?.includes(item)
                                    ? 'radio-button-on'
                                    : 'radio-button-off'
                                }
                                size={24}
                                color="#281E87"
                                // onPress={() => sizefiltertogglebtn(index)}
                              />


                              <View>
                                <Text style={{ fontSize: 18, color: 'black', marginLeft: '9%' }}>{item}</Text>
                              </View>
                            </Pressable>
                          )}
                          keyExtractor={(item, index) => index.toString()}

                        />
                      </View>

                    )

                  })}


                </>
              </View>
            </View>

            {/* <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#EBE7E6' }}>
              <FlatList
                data={filtercat}
                renderItem={filterrendercat}
                keyExtractor={(item, index) => index.toString()}

              />
            </View> */}
          </View>
        </ScrollView>

        <TouchableOpacity style={{
          backgroundColor: 'orange', padding: 10
        }}
        //  onPress={() => apicall()}
        >
          <Text style={{ fontSize: 18, alignSelf: 'center', fontWeight: '600', color: 'white' }}
          onPress={()=>filterapi()}>save</Text>
        </TouchableOpacity>

        {/* </View>
        </View> */}
      </Modal>
      <View style={styles.headercontainer}>
        <View style={{flexDirection: 'row'}}>
          <AntDesign
            name="arrowleft"
            size={30}
            color="black"
            // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              fontSize: 22,
              color: 'black',
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            {props.route.params.title}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View>
            <AntDesign
              name="search1"
              size={23}
              color="black"
              style={{marginLeft: 50}}
              onPress={() => SetModalVisible(!modalVisible)}
            />
          </View>

          <View>
            <AntDesign
              name="hearto"
              size={22}
              color="black"
              // onPress={showMenu}
              // style={{
              //   marginRight: 8,
              // }}
            />
          </View>
          <View>
            <Feather
              name="shopping-bag"
              size={20}
              color="black"
              //   onPress={showMenu}
              // style={{
              //   marginRight: 8,
              // }}
            />
          </View>
        </View>
      </View>

      <LinearGradient
        colors={['white', 'white']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.gradient}>
        <View style={{marginLeft: 30}}>
          <FlatList
            contentContainerStyle={{gap: 10}}
            columnWrapperStyle={{gap: 20}}
            numColumns={2}
            data={listing}
            renderItem={(itemss, index) => {
              return (
                <View
                  style={{alignItems: 'center', marginLeft: 0, width: '44%'}}>
                  <View style={styles.NewArrivalproduct}>
                    {liked?(
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

                    <TouchableOpacity onPress={() => buynow(itemss)}>
                      <Image
                        // source={require('../../Assects/Images/tshirt.png')}
                       
                        source={{uri:itemss.item.images.small}}
                        style={styles.NewArrivalproductimage}
                      />
                     
                      {/* <FlatList
                       
                        data={nestedlist}
                        renderItem={nestedflatlist}
                        keyExtractor={(item, index) => index.toString()}
                        style={{alignSelf: 'center'}}
                      /> */}
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
                        {itemss.item.product_name}
                        {/* {console.log(
                          itemss.item.images[0],
                          'my controll--->>',
                        )} */}
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
                        {itemss.item.product_price}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}></FlatList>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Newarrival;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  NewArrivalheader: {
    // alignSelf: 'center',
  },
  NewArrivalheadertext: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    // textDecorationLine: 'underline',
    marginVertical: 15,
  },
  NewArrivalproductcontainer: {
    flexDirection: 'row',
    // backgroundColor: 'pink',
    height: 400,
    // width: '98%',
    // justifyContent: 'space-around',
    alignSelf: 'center',
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
  priceholder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buynowbtn: {
    width: '60%',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    borderRadius: 7,
    marginVertical: '10%',
    backgroundColor: 'orange',
  },
  headercontainer: {
    flexDirection: 'row',
    // backgroundColor: '#D1FABD',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
  },
  centeredView: {
    justifyContent: 'center',
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '30%',
    height: 70,
    justifyContent: 'center',
    // padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 44,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '70%',
    alignSelf: 'center',
    borderColor: 'orange',
    borderRadius: 7,
    backgroundColor: 'white',
    fontWeight: '800',
    fontSize: 16,
  },
  headercontainer: {
    flexDirection: 'row',
    // backgroundColor: '#D1FABD',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
  },
  sortingprice: {
    fontSize: 15,
    color: 'black',
    fontWeight: '800',
  },
});
