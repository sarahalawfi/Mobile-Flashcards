import React from 'react';
import { StyleSheet, Text, View ,Platform, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { purple, white, pink } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import * as Constants from 'expo-constants';
import AddDeck from './components/AddNewDeck'
import DeckView from './components/DeckView'
import DeckDetail from './components/DeckDetail'
import AddCardToTheDeck from './components/AddCardToTheDeck'
import Quiz from './components/Quiz'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}



const TabNavigator = createBottomTabNavigator({
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
 
  tabBarOptions: {
    activeTintColor: pink ,
    style: {
      height: 56,
      backgroundColor:  white ,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});



const Tabs = createAppContainer(TabNavigator);


const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: "FlashCard ",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pink,
      }
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      title:"Deck Detail",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pink,
      }
    }
  },
  AddCardToTheDeck: {
    screen: AddCardToTheDeck,
    navigationOptions: {
      title: "New Card",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pink,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pink,
      }
    }
  }


})
const MainContainer = createAppContainer(MainNavigator)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
         < UdaciStatusBar backgroundColor = { pink } barStyle = "light-content" />
          <MainContainer/> 
        </View>
        </Provider>
    )
  }
}