import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView,Animated} from 'react-native'
import { purple, white, pink } from '../utils/colors'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { AppLoading } from 'expo'
import {  ListItem } from "react-native-elements";

//Source for Change color Animated: https://codedaily.io/screencasts/8/Animate-Colors-with-React-Native-Interpolate

 class DeckView extends React.Component {
     state = {
         ready: false
     }
   
     componentWillMount() {
         this.animatedValue = new Animated.Value(0);
     }

    componentDidMount() {
        const { dispatch } = this.props

        Animated.timing(this.animatedValue, {
            toValue: 150,
            duration: 1500
        }).start();
       
        getDecks()
        .then(decks => dispatch(receiveDecks(decks)))
            .then(() => this.setState(() => ({ ready: true })))

    }

    render() {
        const { ready } = this.state
        const {decks} =this.props

        const interpolateColor = this.animatedValue.interpolate({
            inputRange: [0, 150],
            outputRange: ['rgb(0,0,0)', 'rgb(51, 250, 170)']
        })

        const animatedStyle = {
            backgroundColor: interpolateColor
        }

        if (ready === false) {
            return <AppLoading />
        }


        return (
            <ScrollView>
            < Animated.View style={styles.container}>
                {
                    Object.values(decks).map(({ title, questions}) =>(
                        <TouchableOpacity key={title} onPress={e => this.props.navigation.navigate(
                            'DeckDetail',
                            { title, questions }  )}>

                        <ListItem key={title} 
                         title={< View style={{ alignItems: 'center', fontSize: 20 }}>
                                    <Text style={{ alignItems: 'center', fontSize: 20 }}>{title}</Text>
                              </View>} 
                        subtitle={
                                < View style={{ alignItems: 'center', fontSize: 20 }}>
                                <Text style={{ alignItems: 'center', fontSize: 20 }}>{`${questions.length} Cards`}</Text>
                              </View>}
                        bottomDivider/>

                        </TouchableOpacity>
                    ))
                    
                }
            </Animated.View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: pink
    },
})

function mapStateToProps(decks){
    return{
        decks
    }
}

export default connect(mapStateToProps)(DeckView)