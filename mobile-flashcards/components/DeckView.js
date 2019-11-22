import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'



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
        const {decks} =this.props
        return (
                <View >
                <Text>{JSON.stringify(this.props)}</Text>
                </View>
        )
    }
}

function mapStateToProps(decks){
    return{
        decks
    }
}

export default connect(mapStateToProps)(DeckView)