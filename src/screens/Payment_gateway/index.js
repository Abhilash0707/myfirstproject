import { NativeEventEmitter, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import {DrawerActions, useNavigation} from '@react-navigation/native';
import PayUBizSdk from 'payu-non-seam-less-react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payment_gateway = props => {
  const navigation = useNavigation();
  const [environmentTest, setEnvironmentTest] = useState('1');
  const [environmentProd, setEnvironmentProd] = useState('0');
//   const eventEmitter = new NativeEventEmitter(PayUBizSdk);
    console.log(props.route.params.midpauy,'paramsNew1');
    //  useEffect(()=>{
    //     createPaymentParams(props.route.params)
    // },[])
    useEffect(() => {
      
        const eventEmitter = new NativeEventEmitter(PayUBizSdk);
       const payUOnPaymentSuccess = eventEmitter.addListener('onPaymentSuccess', onPaymentSuccess);
       const payUOnPaymentFailure = eventEmitter.addListener('onPaymentFailure', onPaymentFailure);
       const payUOnPaymentCancel = eventEmitter.addListener('onPaymentCancel', onPaymentCancel);
       const payUOnError = eventEmitter.addListener('onError', onError);
       const payUGenerateHash = eventEmitter.addListener('generateHash', generateHash);
    
        console.log('check useefectparams');
        // Cleanup event listeners on component unmount
        return () => {
            console.log("Unsubscribed!!!!")
            payUOnPaymentSuccess.remove();
            payUOnPaymentFailure.remove();
            payUOnPaymentCancel.remove();
            payUOnError.remove();
            payUGenerateHash.remove();
        };
      }, []);
      const onPaymentSuccess = e => {
        // console.log(e.merchantResponse, 'merchantResponse');
        console.log(e.payuResponse, 'payuResponse');
        checkForPayuSuccess(e.payuResponse);
        // this.props.navigation.replace('DrawerContainer');
      };
      const onPaymentFailure = e => {
        // console.log(e.merchantResponse, 'merchantResponse failure');
        console.log(e.payuResponse, 'payuResponse failure');
        checkForPayuFailure(e.payuResponse);
        // this.props.navigation.replace('DrawerContainer');
      };
      const onPaymentCancel = e => {
        console.log('payment cancel-------------------------------->>');
      };
    
      const generateHash = async e => {
        console.log(e, 'eeeeeeee');
        try {
        var hashStringWithoutSalt = e.hashString;
        var hashName = e.hashName;
        let hashData = new FormData();
        hashData.append('request_type', 'generate_hash');
        hashData.append('hashStringwithoutSalt', e.hashString);
        // console.log(midpauy,'payment_id');
        hashData.append('payment_id', props.route.params.midpauy);
    
        // if (midpauy != undefined && midpauy !='') {
          
        //   console.log(midpauy,'payment_id_inside');
        //   // console.log(this.state.midpauy, "this.state.midpauy");
        // }
    
        console.log(hashData, 'hashData');
    
        const storedEmployeeId = await AsyncStorage.getItem('token');
        // console.log(storedEmployeeId,'tokennnnn');
    
          const response = await fetch(
            'http://192.168.10.189/Project-4/public/api/generate-hash',
            {
              method: 'post',
              headers: {
                Authorization: `Bearer ${storedEmployeeId}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              // body: JSON.stringify(hashData),
            body: JSON.stringify({
                request_type:'generate_hash',
                hashStringwithoutSalt:e.hashString,
                payment_id:props.route.params.midpauy
            }),
            },
          );
    
          const json = await response.json();
          console.log(json, 'generate_hash1');
    
          if (json.status === 1) {
            console.log(json.hashSHAStringwithSalt, 'hashGenerationMethod');
            var hashValue = json.hashSHAStringwithSalt;
            var result = {[hashName]: hashValue};
            console.log(result,'result');
            PayUBizSdk.hashGenerated(result);
          } else {
            console.log('cancled_hash');
          }
        } catch (error) {
          console.error(error,"hasherror");
        } finally {
        }
    
        //  props.hashGenerationMethod(hashData, (success, error, data) => {
        //       if (error) {
        //         // console.log('Error While getting Hash in server');
        //       } else {
        //         // console.log(data, 'hashGenerationMethod');
        //         var hashValue = data.hashSHAStringwithSalt;
        //         var result = {[hashName]: hashValue};
        //         PayUBizSdk.hashGenerated(result);
        //       }
        //     });
      };

// const generateHash = async e => {
//   console.log(e.hashString, 'eeeeeeee');
//   var hashStringWithoutSalt = e.hashString;
//   var hashName = e.hashName;
//   let hashData = new FormData();
//   hashData.append('request_type', 'generate_hash');
//   hashData.append('hashStringwithoutSalt', e.hashString);
//   hashData.append('payment_id', props.route.params.midpauy);

//   console.log(hashData, 'hashData');

//   const storedEmployeeId = await AsyncStorage.getItem('token');
//   try {
//     const response = await axios.post(
//       'http://192.168.10.189/Project-4/public/api/generate-hash',
//       hashData,
//       {
//         headers: {
//           Authorization: `Bearer ${storedEmployeeId}`,
//           Accept: 'application/json',
//         //   'Content-Type': 'application/json',
//         },
//       }
//     );

//     const json = response.data;
//     console.log(json, 'generate_hash1');

//     if (json.status === 1) {
//       console.log(json.hashSHAStringwithSalt, 'hashGenerationMethod');
//       var hashValue = json.hashSHAStringwithSalt;
//       var result = { [hashName]: hashValue };
//       console.log(result, 'result');
//       PayUBizSdk.hashGenerated(result);
//     } else {
//       console.log('cancled_hash');
//     }
//   } catch (error) {
//     console.error(error,'hashError');
//   }
// };

      const onError = e => {
        console.log(e, 'onError2');
      };



    const createPaymentParams = json => {
        var txnid = new Date().getTime().toString();
        console.log(json, 'pppppkkkeyyyyy2222');
        // console.log('AutoSelectOtp: '+autoSelectOtp +'MerchantSmsPermission: '+merchantSMSPermission);
        var payUPaymentParams = {
          key: json.item.data.key,
          transactionId: txnid,
          amount: json.item.data.amount.toString(),
          // amount:"2355",
          productInfo: json.item.data.product_info,
          firstName: json.item.data.first_name,
          email: json.item.data.email,
          phone: json.item.data.phone,
          ios_surl: json.item.data.successUrl,
          ios_furl: json.item.data.failureUrl,
          android_surl: json.item.data.successUrl,
          android_furl:json.item.data.failureUrl,
          // environment: penvironment,
          environment:
          json.item.data.ENVIRONMENT == 'TEST' ? environmentTest : environmentProd,
          userCredential: json.item.data.key + ':' +json.item.data.email,
          additionalParam: {
            udf1:json.item.data.udf1.toString(),
            // udf1: '2',
            udf2: json.item.data.udf2,
            udf3: json.item.data.udf3,
            udf4:json.item.data.udf4,
            payment: json.item.data.hash,
            // udf5: udf5,
            // walletUrn: '100000',
          },
        };
       
    
        var paymentObject = {
          payUPaymentParams: payUPaymentParams,
        };
    
        console.log(paymentObject, 'paymentObject');
        PayUBizSdk.openCheckoutScreen(paymentObject);
      };
  return (
    <TouchableOpacity onPress={()=>createPaymentParams(props.route.params)}>
      <Text>Payment_gateway</Text>

    </TouchableOpacity>
  )
}

export default Payment_gateway

const styles = StyleSheet.create({})