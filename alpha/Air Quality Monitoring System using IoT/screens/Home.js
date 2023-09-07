// App Home Screen

import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ref, onValue, query, limitToLast, get, remove, set } from 'firebase/database';
import { db } from '../firebase';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import Donut from '../components/Donut';
import { StatusBar } from 'expo-status-bar';
import { fonts, shadowProps, width, getCurrentDate, getMessageMQ135, getMessageMQ7, getSymptomsMQ7, height } from '../Constants';


// To get the latest value from database pointed by the reference 'dbRef'
const getLatestValue = async (dbRef) => {
  const queryRef = query(dbRef, limitToLast(1));
  const snapshot = await get(queryRef);
  return Object.values(Object.values(snapshot.val())[0])[0];
};


const Home = () => {


  const nav = useNavigation(); // Used for navigating to a different screen

  const currentDate = getCurrentDate(); 

  const mq7Ref = ref(db, `MQ7/${currentDate}`); // Database reference for MQ7 sensor 
  const mq135Ref = ref(db, `MQ135/${currentDate}`); // Database reference for MQ135 sensor 

  const statusRef = ref(db, 'status'); // Database reference for current status of Raspberry Pi

  const [airQuality, setAirQuality] = useState({ mq135: 0, mq7: 0 }); // State variable to display sensor values
  const { mq135, mq7 } = airQuality;
  const [ mq7PathExists, setmq7Path ] = useState(false);  // State variable to check if database reference exists
  const [ mq135PathExists, setmq135Path ] = useState(false);

  const [ deviceStatus, setDeviceStatus ] = useState('Offline'); // State variable to store current status of Raspberry Pi

  // To power off the device
  const devicePowerOff = () => {
    set(statusRef, 'Offline');
    setDeviceStatus('Offline');
  }


  useEffect(() => {

    let mq7_listener, mq135_listener, status_listener;  // Database listeners to listen for change in values

    const fetchAirQuality = async () => {

      // MQ7 reference listener for listening to changes in the readings of MQ7 sensor
      mq7_listener = onValue(mq7Ref, async(snapshot) => { 

        if (snapshot.exists()) {  // If value exists, get the latest value and update the airQuality state variable
          const mq7Value = await getLatestValue(mq7Ref);
          setAirQuality(prev => ({ ...prev, mq7: mq7Value }));

          if(!mq7PathExists)  // To set state variable to true to indicate reference to MQ7 readings exists  
            setmq7Path(true);
        }

        else {  // If value does not exists, then the reference does not exist
          setAirQuality(prev => ({ ...prev, mq7: 0 })); // set state variable for MQ7 to 0
          setmq7Path(false);  
        }
      });

      // Same procedure for MQ135 reference

      mq135_listener = onValue(mq135Ref, async (snapshot) => {

        if(snapshot.exists()) {
          const mq135Value = await getLatestValue(mq135Ref);
          setAirQuality(prev => ({ ...prev, mq135: mq135Value }));
          if(!mq135PathExists)
            setmq135Path(true);
        }
        else {
          setAirQuality(prev => ({ ...prev, mq135: 0 }));
          setmq135Path(false);
        }
      });
      
      // Listens to the change in device status (online/offline)
      status_listener = onValue(statusRef, async (snapshot) => {

        if (snapshot.exists())
          setDeviceStatus(snapshot.val());  // Sets the state variable deviceStatus to corresponding value in the reference
      
      })
    };   
    
    fetchAirQuality();

    return (() => {
      // Remove the listeners 
      mq7_listener();
      mq135_listener();
      status_listener();
    })
    
  }, []);


  // For setting the message to be displayed according to different values read from the sensor
  const mq7_msg = getMessageMQ7(mq7);
  const mq135_msg = getMessageMQ135(mq135);
  const mq7_symptoms = getSymptomsMQ7(mq7);

  return (
    <SafeAreaView style={styles.view}>
      {/* View displaying current status of device, and powers off the device on long press */}
      <TouchableOpacity style={styles.status} disabled={deviceStatus === 'Offline'} onLongPress={() => devicePowerOff()}>
        <View style={styles[`circle_${deviceStatus}`]}></View>
        <Text style={styles.content_text}>{`Device ${deviceStatus}`}</Text>

      </TouchableOpacity>

      <View style={styles.header_view}>
        <Text style={styles.header}> AIR QUALITY MONITORING SYSTEM</Text>
      </View>

      <View style={styles.graph_view}>

        {/* Donut/Circular progress bar for MQ7 sensor. Clears database values and removes reference on long press */}
        <TouchableOpacity 
          style={styles.donut_view}
          onLongPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              remove(mq7Ref);
            }
          } 
          disabled = {!mq7PathExists} // Disables the button if database reference does not exist 

          // When pressed, navigate to Info screen that displays the graph and inferences for MQ7 readings
          onPress={() => nav.navigate('Info', {dbPath : `MQ7/${currentDate}`, heading : 'Carbon Monoxide levels', sensor : 'MQ7'})
        
        }
        > 
          <Donut color={'#43736D'} text={mq7} percentage={mq7} fill_color={'#526965'}/>
        </TouchableOpacity>


        {/* Donut/Circular progress bar for MQ135 sensor. Clears database values and removes reference on long press */}
        <TouchableOpacity 
          style={styles.donut_view} 
          disabled = {!mq135PathExists}  // Disables the button if database reference does not exist 
          onLongPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            remove(mq135Ref);
          
          }} 
          // When pressed, navigate to Info screen that displays the graph and inferences for MQ135 readings
          onPress={() => nav.navigate('Info', {dbPath : `MQ135/${currentDate}`, heading : 'MQ135 Readings', sensor : 'MQ135'})}
        >
          <Donut color={'#536887'} text={mq135} percentage={mq135} fill_color={'#4a5463'}/>
        </TouchableOpacity>

      </View>

      <View style={styles.box_container}>

       
        <View style={[styles.box, {backgroundColor : '#43736D'}]}>

          {/* Display pollution level and symptoms for MQ7 readings */}
          <View style={styles.condition}>
            <Text style={styles.text}>{mq7_msg}</Text>
          </View>
          { mq7_symptoms === '' ? null  : (
            <View style={styles.symptoms}>
              <Text style={styles.symptoms_text}>{mq7_symptoms}</Text>
            </View>

          )}
           <View style={styles.content}>
              <Text style={styles.content_text}>CO</Text>
            </View>  
        </View>
       

        
        <View style={[styles.box, {backgroundColor : '#536887'}]}>

          {/* Display pollution level MQ135 readings */}
          <View style={styles.condition}>
            <Text style={styles.text}>{mq135_msg}</Text>
          </View>
        
          <View style={styles.content}>
            <Text style={styles.content_text}>OTHERS</Text>
          </View>

        </View>

        {/* View that opens screen for contacting Emergency services when pressed */}
        <TouchableOpacity onPress={() => nav.navigate('Emergency')} style={styles.emergency_call}>

          <View style={styles['condition']}>
            <Text style={[styles.text, {fontSize : fonts.medium - 3}]}>CALL EMERGENCY SERVICES</Text>
          </View>

        </TouchableOpacity>
  
      </View>      
      <StatusBar backgroundColor="#1C2735" />
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
      header_view : {
        height : '15%',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
      },

      header : {
          color : '#627670',
          fontSize : fonts.large,
          textAlign : 'center',
          fontFamily : 'productsans'
      },
    graph_view : {
      ...shadowProps,
      padding : width * 0.02,
      width : '100%',
      backgroundColor : '#243345',
      borderRadius : 20,
      display : 'flex',
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'space-around',
     
    },
    donut_view : {
      display : 'flex',
      alignItems : 'center',
      justifyContent : 'center'
    },
    box_container : {
      ...shadowProps,
      backgroundColor : '#243345',
      borderRadius : 20,
      display : 'flex',
      minHeight : height * 0.4,
      alignItems : 'center',
      justifyContent : 'space-evenly',
      width : '100%',
    
      margin : width * 0.035,
      
    },
    box : {
      display : 'flex',
      width : '90%',
      paddingLeft : 18,
      paddingTop : 18,
      paddingRight : 14,
      paddingBottom : 8,
      borderRadius : 20
    },
    condition : {
      alignSelf: 'flex-start',
      display : 'flex',
      alignItems : 'flex-start',
      justifyContent : 'flex-start'
    },
    content : {
      alignSelf : 'flex-end',
      display : 'flex',
    },

    symptoms_text : {
      fontFamily : 'productsans',
      fontSize : fonts.small
    },
    text : {
      fontSize : fonts.medium,
      fontFamily : 'productsans'
    },
    content_text : {
      fontSize : fonts.small,
      fontFamily : 'productsans_bold'
    },
    emergency_call : {
      backgroundColor : '#7A3C3C',
      width : '90%',
      padding : width * 0.04,
      borderRadius : 15
    },
    status : {
      alignSelf : 'flex-start',
      backgroundColor : '#4b4d73',
      padding : width * 0.015,
      width : width * 0.36,
      borderRadius : 15,
      display : 'flex',
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'space-around'
    },
    circle_Online : {
    
      width : width * 0.02,
      height : width * 0.02,
      borderRadius : width * 0.01,
      backgroundColor : '#43736D'
    },
    circle_Offline : {
     
      width : width * 0.02,
      height : width * 0.02,
      borderRadius : width * 0.01,
      backgroundColor : '#7A3C3C',

    }

});

export default Home;