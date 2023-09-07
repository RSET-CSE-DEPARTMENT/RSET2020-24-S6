// Initialises all the constants in the app

import { Dimensions, Platform } from "react-native";

// Screen width and height of the user's device
export const {width, height } = Dimensions.get('window');

// Font sizes
export const fonts = {

    small : Platform.OS === 'ios' ? height * 0.015 : height * 0.02,
    medium : Platform.OS === 'ios' ? height * 0.02 : height * 0.03,
    large :  Platform.OS === 'ios' ? height * 0.03 : height * 0.04

}

// Properties for shadow in UI elements
export const shadowProps = {
    shadowColor : '#000000',
    elevation : 8,
    shadowOpacity : 0.7,
    shadowRadius : 4,
    shadowOffset : {
        x : 10,
        y : 5
    }
}

// Function to get the current date
export const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };

// Returns the pollution level for a given MQ7 sensor reading
export const getMessageMQ7 = (value) => {
    if (value <= 9) return 'NORMAL';
    else if (value <= 35) return 'ACCEPTABLE';
    else if (value <= 100) return 'MARGINAL';
    else if (value <= 200) return 'POOR';
    else if (value <= 400) return 'HAZARDOUS';
    else if (value <= 800) return 'DANGEROUS';
    else return 'LIFE THREATENING';
  };


// Returns the pollution level for a given MQ135 sensor reading
export const getMessageMQ135 = value => {

    if (value <= 50 ) return "GOOD";
    else if (value<=100) return 'MODERATE';
    else if (value <= 200) return 'SENSITIVE';
    else if (value <= 300) return 'UNHEALTHY';
    else if (value <= 500) return 'HAZARDOUS';
    else return 'DANGEROUS'
  }


// Returns the symptoms for a given MQ7 sensor reading
export const getSymptomsMQ7 = (value) => {
    if(value >= 35 && value <= 100) return 'You may experience mild headache and fatigue';
    if(value > 100 && value <= 200) return 'Headache, dizziness, nausea, and confusion';
    if(value > 200 && value <= 400) return 'Severe headache, dizziness, and increased heart rate';
    if(value > 400 && value <= 800) return 'Life-threatening, symptoms worsen with prolonged exposure';
    if(value>800) return 'Fatal levels, unconsciousness, and death';
    return '';  
  }
