// Circular progress bar that indicates the pollution levels and its animations

import { Text, Animated, Easing, StyleSheet} from 'react-native'
import Svg,  { G, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import React, { useEffect, useRef } from 'react'
import { fonts } from '../Constants';


/* Props : duration - Animation duration, max - Maximum value in the progress bar,  color - Progress bar outer color,
           text - Text to be displayed inside progress bar, percentage - Current progress percentage,
           fill_color - Inner color of progress bat
*/
const Donut = ({duration = 750, max = 1000, color, text="default", percentage, fill_color}) => {

  const circumference = Math.PI * 80; // Circumference of circular progress bar 
  const animated = useRef(new Animated.Value(0)).current; // Initial reference value for animation 
  const circleRef = useRef(); // Reference value for current progress

  const width = 150, height = 150; // Svg width and height
 
  useEffect(() => {
    
    // Creating animation timing function with the animation reference, percentage, duration and animation type
    const animation = Animated.timing(animated, {
      toValue: percentage,
      duration,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    });

    // Listener for listening changes in animation reference
    const listener = animated.addListener((v) => {
      const Perc = 100 * v.value / max; // Calculate percentage from new value
      
      const strokeDashoffset = circumference - (circumference * Perc) / 100; // Progress value
      
      if (circleRef?.current) { // Set progress value
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
    
    animation.start();

    return () => {
      // Remove animation listener
      animated.removeListener(listener);
    };
  }, [animated, circumference, duration, max, percentage]);

  return (
  <>
    <Svg width={width} height={height} viewBox={`0 0 100 100`} >
      <G>
        <Circle cx='50%' cy='50%' stroke={color} strokeWidth={10} r={40}
          strokeOpacity={0.2}
          fill={'transparent'} /> 

        <Circle cx='50%' cy='50%' stroke={color} strokeWidth={10} r={40}
          strokeDasharray={circumference} 
          strokeDashoffset={circumference}
          strokeLinecap='round'
          ref={circleRef}
          fill={'transparent'}/>    


        <Defs>
          <RadialGradient id="shadow" cx="50%" cy="50%" strokeWidth={0}>
            <Stop offset="0%" stopOpacity="1" stopColor="#000" strokeWidth={0} />
            <Stop offset="100%" stopOpacity="0.11" stopColor="#000" strokeWidth={0} />
          </RadialGradient>
        </Defs>
        
        <Circle cx='50%' cy='50%' r={45} fill={"url(#shadow)"} strokeWidth={0}/>
        <Circle cx='50%' cy='50%' r={35} fill={fill_color} strokeWidth={0}/>

      </G>  
    </Svg>

    <Text style={styles.text}>
     {`${text} ppm`}
    </Text>

    </>

    );
}
const styles = StyleSheet.create({
  text : {
    fontFamily : 'productsans_med', 
    position : 'absolute', 
    fontSize : fonts.small,
    color : '#191919'
  }
}) 


export default Donut;