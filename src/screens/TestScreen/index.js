// import { Pressable, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { useNavigation } from '@react-navigation/native';
// import Header from '../../Component/Header';

// const TestScreen = () => {
//     const navigation = useNavigation();

//   return (
//     <View>
//       <Header/>
//         <Text>TestScreen</Text>

//     </View>
//   )
// }

// export default TestScreen

// const styles = StyleSheet.create({})
import React, {useState, useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Ratings from '../../Component/Header/Ratings';

const TestScreen = () => {
  const navigation = useNavigation();
  const [radiobtn, setRadiobtn] = useState(false);
  // const [ratingVal,setRatingval]=useState(true);
  const [brand, setBrand] = useState([]);
  const [size, setSize] = useState([]);
  const [filtercat, setFiltercat] = useState([]);
 

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


  const sizefiltertogglebtn = index => {
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
  const checkbtn = (index )=> {
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


  // console.log(ratingarr, 'iiii');
  useEffect(() => {
    apicall();
  }, []);

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
            catId: 6,
          }),
        },
      );
      const json = await response.json();

      if (json.status === 1) {
        // const myjsondata = json.data;
        console.log(json.filters, '-------------')
        setBrand(json.brandfilter?.data)
        setFiltercat(json.filters)
        // 
        // 
   

        setRadiobtn(!radiobtn);
      } else {
        Alert.alert(res.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

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


  // console.log(filtercat, 'filtercat');
  const filterrendercatdata=({item, index})=>(
    // <View><Text>{item}</Text></View>
    <View style={{flexDirection: 'row',marginTop:10,marginBottom:10}}>
    {filtercat[index].oncheck ? (
      <MaterialIcons
        name="radio-button-on"
        size={22}
        color="#281E87"
        // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}

        onPress={() =>checkbtn(index,item)}
      />
    ) : (
      <MaterialIcons
        name="radio-button-off"
        size={22}
        color="#281E87"
        // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
        onPress={() => checkbtn(index,item)}
      />
    )}
    <View>
      <Text style={{fontSize: 18, color: 'black',fontWeight:'600',marginLeft:'9%'}}>{item}</Text>
    </View>
  </View>
  )
  const filterrendercat = ({item, index}) => (
    <View style={{marginTop: 10,borderBottomWidth:1,borderBottomColor:'#EBE7E6'}} >
      <View >
      <Text
        style={{
          marginLeft: '2%',
          fontSize: 20,
          color: 'black',
          fontWeight: '600',
        }}>
        {item.name}
      </Text>
      </View>
      <View style={{marginLeft:'2%'}} >
        {/* <Text>hi</Text> */}
        <FlatList
            data={item.data}
            renderItem={filterrendercatdata}
            keyExtractor={(item, index) => index.toString()}
            // style={{alignSelf: 'center'}}
          />
      </View>
      
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <View style={{flexDirection: 'row'}}>
            <AntDesign
              name="arrowleft"
              size={30}
              color="black"
              // onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
              onPress={() => navigation.goBack()}
            />
            <Text style={{marginLeft: 20, fontSize: 20, fontWeight: '800'}}>
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
                  marginLeft: 20,
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
            height: 125,
            justifyContent: 'center',
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              marginLeft: '2%',
              fontSize: 18,
              color: 'black',
              fontWeight: '600',
            }}>
            Sorting
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <TouchableOpacity style={styles.modalView}>
              <Text style={styles.sortingprice}>Price</Text>
              <Text style={styles.sortingprice}>Low to high</Text>
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
        <View style={{marginTop: 10,borderBottomWidth:1,borderBottomColor:'#EBE7E6'}}>
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
          
          <View style={{marginTop: 10}}>
            <FlatList
              data={ratingarr}
              renderItem={({item, index}) => (
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
                  <View style={{marginLeft: 10}}>
                    <Ratings data={item.id} />
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              
            />
          </View>
        </View>
        <View style={{marginTop: 10,borderBottomWidth:1,borderBottomColor:'#EBE7E6'}}>
          <Text
            style={{
              marginLeft: '2%',
              fontSize: 20,
              color: 'black',
              fontWeight: '600',
            }}>
            Brand
          </Text>
          <View style={{marginLeft:'2%',marginTop:10,marginBottom:10}}>
            <FlatList
              data={brand}
              renderItem={filtercategory}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

        <View style={{marginTop: 10,borderBottomWidth:1,borderBottomColor:'#EBE7E6'}}>
          <FlatList
            data={filtercat}
            renderItem={filterrendercat}
            keyExtractor={(item, index) => index.toString()}
           
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
   
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

export default TestScreen;
