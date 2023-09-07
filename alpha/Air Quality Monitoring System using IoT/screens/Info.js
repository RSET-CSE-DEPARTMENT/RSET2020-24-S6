// Displays the graph plots for both the sensors with inferences

import { Text, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../firebase';
import { LineChart } from "react-native-chart-kit";
import { onChildAdded, ref } from 'firebase/database';
import DataCard from '../components/DataCard';
import { width, height, fonts, shadowProps, getMessageMQ135, getMessageMQ7 } from '../Constants';


// Functions for filtering out values for morning, evening, night

const morningFilter = (currentValue, index) => {
  return index === 0 || index % 4 === 0 && index <= 48;
}

const eveningFilter =  (currentValue, index) => {
  return index % 4 === 0 && index >= 48 && index <= 72; 
}

const nightFilter = (currentValue, index) => {
  return index % 4 === 0 && index >= 72 && index <= 96;
}

const noFilter = (currentValue) => {
  return true;
}

// Calculates average ppm value for a given range
const avg = array => {
  return Math.round(array.reduce((a, b) => a + b, 0)/array.length, 2);
}


const Info = ({ route, navigation }) => {

  const total_label_set = useRef([]); // Total time values from 00:00 to 11:45
  const total_data_set = useRef([]); // Total ppm values from 00:00 to 11:45
  const activeTab = useRef(0);  // Selected tab - Total(0), Morning(1), Evening(2), Night(3)
  const max_ppm = useRef(0);  // Maximum ppm value for selected tab
  const min_ppm = useRef(0);  // Minimum ppm value for selected tab


  const [graphData, setGraphData] = useState({ labels: [], datasets: [{ data: [] }] }); // State variable for plotting graph

  const [clickedDataPoint, setClickedDataPoint] = useState(null); // State variable for storing clicked data point in the graph
  const [ chartWidth , setChartWidth ] = useState(width * 10);  // Chart width that changes according to selected tab
  const [ maxValue, setMaxValue] = useState(0); // Max ppm value
  const [ minValue, setMinValue] = useState(0); // Min ppm value
  const [ maxTime, setMaxTime ] = useState(''); // Time of max ppm value
  const [ minTime, setMinTime ] = useState(''); // Time of min ppm value

  const [ avgValue, setAvgValue] = useState(0); // Average ppm value

  const [loading, setLoading] = useState(true); // Check if data is loaded for plotting graph

  const { dbPath, heading, sensor } = route.params; // Get database path, heading to be displayed and selected sensor from previous screen
  
  // Tabs for filtering data
  const tabs = [
    { 'name' : 'Total', 'filterFunction' : noFilter, 'graphWidth' : width * 10 },
    { 'name' : 'Morning', 'filterFunction' : morningFilter, 'graphWidth' : width * 2},
    { 'name' : 'Evening',  'filterFunction' : eveningFilter, 'graphWidth' : width },
    { 'name' : 'Night', 'filterFunction' : nightFilter, 'graphWidth' : width },
  ]

  const [ selectedTab, setSelectedTab ] = useState(0); // Stores selected tab
  let listener;

  // Function that runs when a different tab is selected
  const changeGraphData = (index) => {   
    setChartWidth(tabs[index].graphWidth);  // Set chartwidth according to selected tab

    // Filter data set according to selected tab
    const label_set = total_label_set.current.filter(tabs[index].filterFunction);
    const ppm_values = total_data_set.current.filter(tabs[index].filterFunction);


    if (ppm_values.length === 0){ // If no values, loading is true
      setLoading(true);
      return;
    }
    setLoading(false);  // If values exists, loading is set to false and graph can be plotted

    // Setting graph data to be plotted
    setGraphData({
      labels: label_set,
      datasets: [{ data: ppm_values }]
    });

    // Calculating maximum, minimum ppm values
    max_ppm.current = Math.max(...ppm_values)
    min_ppm.current = Math.min(...ppm_values)

    // Calculating and setting average ppm value
    setAvgValue(avg(ppm_values))
    
    // Setting maximum ppm value and corresponding time
    setMaxValue(max_ppm.current);
    setMaxTime(label_set[ppm_values.indexOf(max_ppm.current)]);
   
    // Setting minimum ppm value and corresponding time
    setMinValue(min_ppm.current);
    setMinTime(label_set[ppm_values.indexOf(min_ppm.current)]);

  }

  useEffect(() => {
    
    if (!loading) return;

    const dbRef = ref(db, dbPath); // Get database reference 

    // Database listener for listening for events when new a value is added
    listener = onChildAdded(dbRef, (snapshot) => {

      const data = snapshot.val(); // Get the newly inserted data object
      // Get new ppm and time values
      const ppm = Object.values(data)[0]; 
      const time = Object.keys(data)[0];

      // Append the newly inserted ppm and time values to the corresponding data sets
      total_label_set.current = [...total_label_set.current, time];
      total_data_set.current = [...total_data_set.current, ppm];

      // Apply filters for selected tab with the new data sets
      const label_set = total_label_set.current.filter(tabs[activeTab.current].filterFunction);
      const ppm_values = total_data_set.current.filter(tabs[activeTab.current].filterFunction);

      if (ppm_values.length === 0){
        setLoading(true);
        return;
      }
      
      // Set data for plotting graph
      setGraphData({
        labels: label_set,
        datasets: [{ data: ppm_values }]
      });

      max_ppm.current = Math.max(...ppm_values)
      min_ppm.current = Math.min(...ppm_values)

      setAvgValue(avg(ppm_values))
      
      setMaxValue(max_ppm.current);
      setMaxTime(label_set[ppm_values.indexOf(max_ppm.current)]);
     
      setMinValue(min_ppm.current);
      setMinTime(label_set[ppm_values.indexOf(min_ppm.current)]);

      // If loading, set it to false as data has been fetched 
      if (loading) setLoading(false);
    });

    return () => {
      // Remove listener
      listener();
    };
  }, []);

  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.heading}>{heading}</Text>

      <View style={styles.chart_container}>       
        <ScrollView
          style={styles.scroll_view_container}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          
          {/* If data is still loading, display 'Data not available' else plot the graph and display */}
          {loading ? 
          
          <View style={{width: width, height : 300, display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
            <Text style={styles.additional_info_text}>Data not available</Text>
          </View>: (
            <LineChart
              data={graphData}
              width={chartWidth}
              onDataPointClick={({ index }) => {
          
                setClickedDataPoint(index);
              }}
              withVerticalLabels={true}
              withVerticalLines={true}
              withHorizontalLabels={true}
              withHorizontalLines={true}
              height={300}
              withDots={true}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={500}
              chartConfig={{
                backgroundColor: '#344050',
                backgroundGradientFrom: '#466568',
                backgroundGradientTo: "#466568",
                decimalPlaces: 0,
                color: (opacity = 1) => '#1C2735',
                labelColor: (opacity = 1) => "#1C2735",
                propsForDots: {
                  r: "4",
                  strokeWidth: "0",
                }
              }}
              bezier
              style={{
                paddingRight: width * 0.1,

                borderRadius : 15
               
              }}
              renderDotContent={({ x, y, index }) => {
                if (index !== clickedDataPoint) return null; // If current index is not clicked point, do nothing
                // Else display data card for the clicked point
                return (
                  <TouchableOpacity key={index} >
                    <DataCard
                      x={x}
                      y={y} 
                      ppm={graphData.datasets[0].data[index]}
                      time={graphData.labels[index]}
                    />
                  </TouchableOpacity>
                );
              }}
              segments={2}
            />
          )}

        
     
      </ScrollView>

      <View style={styles.range_filter}>
          {/* Display each tab */}
          {tabs.map((item, index) => 
            <TouchableOpacity key={index} onPress={() =>  { 
              activeTab.current = index;
              setSelectedTab(activeTab.current); 
              changeGraphData(index);
            }} 
              disabled={index === selectedTab} // Selected tab is disabled so that it is not selected again
              // Different style for selected tab
              style={index === selectedTab ? styles.range_button_selected : styles.range_button} > 
              <Text style={styles.range_button_text}>{item.name}</Text>
            </TouchableOpacity>

          )}

      </View>

      </View>
      {/* If loading return null, else display average, maximum and minimum value*/}
      { loading ? null : (
      <View style={styles.additional_info}>
        <View style={styles.info_row}>

          <Text style={[styles.additional_info_text,{ fontSize : fonts.large + 5}]}>Average</Text>
          <View style={{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
            <Text style={styles.additional_info_text}>{avgValue+ ' ppm'}</Text>
            <View style={styles.msg_box}>
              <Text style={{fontFamily : 'productsans', fontSize : fonts.small - 1}}>
                {sensor === 'MQ7' ? getMessageMQ7(avgValue) : getMessageMQ135(avgValue) /*Display message according to selected sensor*/}
              </Text>
            </View>
          </View>
          
        </View>
        <View style={styles.info_row}>
          <Text style={styles.additional_info_text}>Maximum</Text>
          <View style={{display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
            <Text style={styles.additional_info_text}>{maxValue+' ppm'}</Text>
            <Text style={[styles.additional_info_text, {fontSize : fonts.small }]}>{'At '+maxTime}</Text>
          </View>
        </View>

        <View style={styles.info_row}>
          <Text style={styles.additional_info_text}>Minimum</Text>
          <View style={{display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
            <Text style={styles.additional_info_text}>{minValue+' ppm'}</Text>
            <Text style={[styles.additional_info_text, {fontSize : fonts.small }]}>{'At '+minTime}</Text>
          </View>
        </View>
       

      </View>)}
     
    </SafeAreaView>
  );
};

export default Info;

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#1C2735",
    flex: 1,
    padding: width * 0.03,
    alignItems: 'center',
  
  },
  heading: {
    fontFamily: 'productsans_med',
    fontSize: fonts.large,
    color: '#50827e',
    padding: width * 0.01
  },
  scroll_view_container: {
    ...shadowProps,
    backgroundColor: '#1C2735',
    minHeight: '22%',
    borderWidth: 0,
    borderColor: '#555555',
    borderRadius: 15,
    padding: width * 0.01,
    paddingRight: 0,
    display: 'flex',
    flexGrow: 0,
  },
  chart_container : {
    display : 'flex',
    justifyContent : 'space-around',
    height : height * 0.45,

    
  },
  range_filter : {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-around'

  },
  range_button : {
    backgroundColor : '#43736d20',
    padding : width * 0.03,
   
    borderRadius : 15

  },
  range_button_selected : {
    backgroundColor : '#43736d',
    padding : width * 0.03,
   
    borderRadius : 15

  },
  range_button_text : {
    fontFamily : 'productsans',
    fontSize : fonts.small
  },
  additional_info : {
    display : 'flex',
    width : width * 0.9,
    
    paddingTop : width * 0.05,
    flex : 1
  },
  additional_info_text : {
    fontFamily : 'productsans',
    color : '#bbccbb',
    margin : width * 0.004,
    fontSize : fonts.medium - 3
  },
  info_row : {
    borderWidth : 0,
    backgroundColor : '#43736d40',
    paddingHorizontal : width * 0.04,
    paddingVertical : width * 0.03,
    borderRadius : 15,
    margin : width * 0.01,  
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between'
  },
  msg_box : {
    backgroundColor : '#43736D',
    padding : width * 0.02,
    borderRadius : 15,
    margin : width * 0.01
  }
});
