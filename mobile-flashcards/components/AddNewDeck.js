import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { purple, white,black, pink } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import { connect } from 'react-redux'



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
                <Text style={styles.Text}> What is the title of your new deck ? </Text>
                <TextInput style={styles.input}
                    placeholder="Deck title"
                    placeholderTextColor='#f9c6cf'
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
        borderColor: pink,
        borderWidth: 1,
        color:purple,
        alignItems: 'center'
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
        alignItems: 'center'
    },
    Text: {
        color: black,
        fontSize: 22,
        textAlign: 'center',
        alignItems: 'center'
    },
   
})
function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(AddDeck)