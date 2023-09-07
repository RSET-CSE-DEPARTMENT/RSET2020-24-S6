// Small box that appears when a data point in the graph is pressed which shows pollution level at a given time

import {Text, View } from 'react-native'
import React from 'react'
import {width,  fonts, shadowProps} from '../Constants'

const cardWidth = width * 0.25;

/* Props - x : x-coordinate of clicked data point , y : y-coordinate of clicked data point, ppm : ppm value at clicked point,
           time : Time at the clicked point 
*/
const DataCard = ({x, y, ppm, time}) => {
   
    return (

            <View style={{   
                    ...shadowProps,
                    maxWidth : cardWidth ,
                    padding : width * 0.02,
                    borderRadius : 10,
                    backgroundColor : '#327a85',
                    top: y - width * 0.04,
                    left : Math.max(x - cardWidth* 0.5, 0) // Prevent negative values so that the card does not go outside the screen        
            }}
            >
                <Text style={{fontFamily:'productsans', fontSize : fonts.small}}>
                    {`${ppm} ppm at ${time}`}
                </Text>
            </View>

            
       
    );
}

export default DataCard;