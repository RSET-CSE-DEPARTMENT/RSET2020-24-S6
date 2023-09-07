// Screen for displaying and contacting different Emergency Services

import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React from 'react';
import { fonts, height, width } from '../Constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const Emergency = () => {
  return (
    <SafeAreaView style={styles.view}>
        <View style={styles.header_view}>
            <Text style={styles.header}>
                EMERGENCY SERVICES
            </Text>
        </View>
        <View style={styles.box}>
            {/* Displays emergency contacts - Fireforce, Police and Disaster Management */}
            {/* On selecting any of the options, the corresponding contact number will be dialed on the user's phone */}
            <TouchableOpacity onPress={() => Linking.openURL(`tel:101`)} style={styles.emergency_data}>
                <Text style={styles.text}>FIREFORCE</Text>
            </TouchableOpacity>
        
            <TouchableOpacity onPress={() => Linking.openURL(`tel:100`)} style={styles.emergency_data}>
                <Text style={styles.text}>POLICE</Text>
            </TouchableOpacity>
        
            <TouchableOpacity onPress={() => Linking.openURL(`tel:108`)} style={styles.emergency_data}>
                <Text style={styles.text}>DISASTER MANAGEMENT</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({

    view:{
        backgroundColor:"#1C2735",
        display : "flex",
        flex : 1,
        padding : width * 0.035,
        alignItems : 'center'
    },
    emergency_data : {
        borderRadius : 15,
        width : width * 0.9,
        backgroundColor : '#536887',
        padding: width * 0.04,

    },
    header_view : {
        height : '15%',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
      },
  
      header : {
          color : '#627670',
          fontSize : fonts.large,
          textAlign : 'center',
          fontFamily : 'productsans'
      },
    box : {
        display : 'flex',
        padding : width * 0.02,
        borderRadius : 20,
        height : height * 0.3,
        justifyContent : 'space-around'
      },
      text : {
        fontSize : fonts.medium,
        fontFamily : 'productsans'
      },


})

export default Emergency;