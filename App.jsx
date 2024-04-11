// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import MusicTherapyScreen from './MusicTherapyScreen';
import ReadingTherapyScreen from './ReadingTherapyScreen';
import ChatbotScreen from './ChatbotScreen';
import LoadingScreen from './LoadingScreen';
import ProfileScreen from './components/ProfileScreen';
import SignInScreen from './components/SignInScreen';
import AboutUsScreen from './components/AboutUsScreen';
import SettingsScreen from './components/SettingScreen';
import GraphScreen from './components/GraphScreen';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MusicTherapy" component={MusicTherapyScreen} />
      <Tab.Screen name="ReadingTherapy" component={ReadingTherapyScreen} />
      <Tab.Screen name="Chatbot" component={ChatbotScreen} />
    </Tab.Navigator>
  );
}

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the duration as needed
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Harmony">
          <Drawer.Screen name="Harmony" component={MainTabs} options={{
            headerStyle: {
              backgroundColor: '#FFB6C1', // Light pink color
            },
            headerTintColor: 'black', // Text color
            headerTitleStyle: {
              fontWeight: 'bold', // Title font weight
            },
          }} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Sign In" component={SignInScreen} />
          <Drawer.Screen name="About Us" component={AboutUsScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Graph" component={GraphScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
