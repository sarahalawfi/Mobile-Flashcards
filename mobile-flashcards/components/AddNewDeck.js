import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'



function SubmitButton({ onPress }){
    return(
        <TouchableOpacity
        style={styles.iosSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText} >SUBMIT</Text>
        </TouchableOpacity>
    )
}

function Deck (title)  {
    return {
        title,
        questions: []
    }
}


class AddDeck extends Component {
    
    state = {
        // disabledTheButton: true,
        title: ''
    }

   
    submit = () => {
        const { title} = this.state
        const { dispatch} = this.props
        const { navigation } = this.props;
        if (title === ''){
            alert("The title shouldn't be empty")
        }else{
            //  add new deck to redux
            dispatch(addDeck(Deck(title)))
            // add new deck to DB 
            saveDeckTitle(title)

            this.setState({
                title: ''
            })

            //Go to new Deck page 
            navigation.navigate('DeckDetail', { title})
        }
        }
     

   
    
    render() {
        return (
            <View style={styles.container}>
                <Text> What is the title of your new deck ? </Text>
                <TextInput style={styles.input}
                    placeholder="Deck title"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    value={this.state.title}
                    onChangeText={text=> this.setState({ title:text})} />

                <SubmitButton  onPress={this.submit}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
   
})
function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(AddDeck)