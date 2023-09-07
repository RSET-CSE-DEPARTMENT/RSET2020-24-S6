// App entry point

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from './screens/Home';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import Info from './screens/Info';
import Emergency from './screens/Emergency';

const Stack = createNativeStackNavigator(); // Creates a stack navigator for transitioning between screens. Each screen is pushed into a stack 

const App = () => {

  // Specifying custom fonts
  const customFonts = {
    'productsans': require('./assets/fonts/ProductSans-Regular.ttf'),
    'productsans_med': require('./assets/fonts/ProductSans-Medium.ttf'),
    'productsans_bold': require('./assets/fonts/ProductSans-Bold.ttf')
  }

  // State variable to check if fonts are loaded
  const [fontsLoaded, setFontsLoaded] = useState(false);


  // Loading custom fonts
  const loadFonts = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true); // Setting state variable to true as fonts are loaded
  }

  // useEffect hook used to load the fonts as soon as the app is started
  useEffect(() => {
    loadFonts();
  },[]);

  
  if(!fontsLoaded) // If fonts are not loaded, return null
    return null;

  // If fonts are loaded, render the UI components
 
  return(
          <NavigationContainer>
            <SafeAreaProvider>  
                {/* Initialise stack navigator with Home as start screen */}
                <Stack.Navigator initialRouteName = {'Home'} screenOptions={{animation: "slide_from_right"}}>
                  {/* Declare the different screens used in the app */}
                  <Stack.Screen name="Home" component={Home} options = {{headerShown:false}} />
                  <Stack.Screen name="Info" component={Info} options = {{headerShown:false}} />
                  <Stack.Screen name="Emergency" component={Emergency} options = {{headerShown:false}} />
                </Stack.Navigator>
            </SafeAreaProvider>
          </NavigationContainer>
    );

}
export default App;
