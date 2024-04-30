import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Copy = props => {
    console.log(props.route.params.item.item.data);
    const payuMethod = () => {
        // console.log(data, 'datadatadatadata');
    
        var payUPaymentParams = {
          key:props.route.params.item.item.data.key,
          // key: 'Merchant key',
          transactionId: data.data.txn_id,
          amount: data.data.amount,
          productInfo: data.data.product_info,
          firstName: data.data.first_name,
          email: data.data.email,
          phone: data.data.phone,
          ios_surl: data.data.successUrl,
          ios_furl: data.data.failureUrl,
          android_surl: data.data.successUrl,
          android_furl: data.data.failureUrl,
          environment:
            data.data.ENVIRONMENT == 'TEST' ? environmentTest : environmentProd, //<0 for Production/1 for Staging>
          // userCredential: 'key:CustomerID',
          userCredential: data.data.key + ':' + data.data.email,
          additionalParam: {
            udf1: data.data.udf1,
            udf2: data.data.udf2.toString(),
            udf3: data.data.udf3,
            udf4: data.data.udf4,
            // udf5: '',
            // payment_related_details_for_mobile_sdk:
            //   'payment_related_details_for_mobile_sdk hash',
            // vas_for_mobile_sdk: 'vas_for_mobile_sdk hash',
            payment: data.data.hash,
          },
          // payUSIParams: {
          //   isFreeTrial: false,
          //   billingAmount: '10',
          //   billingInterval: 1,
          //   paymentStartDate: '2023-04-20',
          //   paymentEndDate: '2023-04-30',
          //   billingCycle: 'daily', //Can be any of 'daily','weekly','yearly','adhoc','once','monthly'
          //   remarks: 'Test SI transcaction',
          //   billingCurrency: 'INR',
          // },
        };
    
        var payUCheckoutProConfig = {
          // primaryColor: "#aabbcc",'rgb(233,169,69)'
          // secondaryColor: "<Color Hex Code e.g. #000000>",
          merchantName: 'OTDC',
          autoSelectOtp: true,
          merchantResponseTimeout: 5000,
          surePayCount: 0 - 3,
          // paymentModesOrder: [
          //   {UPI: 'TEZ'},
          //   {Wallets: 'PAYTM'},
          //   {Wallets: 'PHONEPE'},
          // ],
          paymentModesOrder: [
            {cards: ''},
            {'net banking': ''},
            {upi: ''},
            {wallets: ''},
            {emi: ''},
          ],
        };
    
        var paymentObject = {
          payUPaymentParams: payUPaymentParams,
          // payUCheckoutProConfig is optional
          // Detail can be found in latter section
          // payUCheckoutProConfig: payUCheckoutProConfig,
        };
    
        // console.log(paymentObject, 'paymentObject');
        PayUBizSdk.openCheckoutScreen(paymentObject);
      };
  return (
    <View>
      <Text>Copy</Text>
    </View>
  )
}

export default Copy

const styles = StyleSheet.create({})