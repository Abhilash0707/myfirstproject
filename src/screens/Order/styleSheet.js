
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    Popularimg: {
        height: 350,
        width: ' 96%',
        borderRadius: 100,
        marginTop: 30

    },
    detailsheading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor:'pink'
    },
    popularorderdetails: {
        //flexDirection:'row'
        fontWeight: 'bold',
        fontSize: 25,
        color: 'black',
        marginRight: 15,
        marginTop: 15


    },
    plusminus: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusbtn: {
        // height:50,
        // width:50,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
    },
    amount: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'pink'
    },
    btn: {
        height: 50,
        width: 50,
        backgroundColor: 'green',


    }

})