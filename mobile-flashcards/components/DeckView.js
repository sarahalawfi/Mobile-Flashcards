import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView,Animated} from 'react-native'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { AppLoading } from 'expo'
import {  ListItem } from "react-native-elements";

//Animated

 class DeckView extends React.Component {
     state = {
         ready: false
     }

    componentDidMount() {
        const { dispatch } = this.props
       
        getDecks()
        .then(decks => dispatch(receiveDecks(decks)))
            .then(() => this.setState(() => ({ ready: true })))

    }

    render() {
        const { ready } = this.state
        const {decks} =this.props

        if (ready === false) {
            return <AppLoading />
        }


        return (
            <ScrollView style={styles.container}>
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
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: white
    },
})

function mapStateToProps(decks){
    return{
        decks
    }
}

export default connect(mapStateToProps)(DeckView)