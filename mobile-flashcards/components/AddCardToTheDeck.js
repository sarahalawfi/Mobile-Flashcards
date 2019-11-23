import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'
import { purple, white } from '../utils/colors'





function SubmitButton({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.iosSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText} >SUBMIT</Text>
        </TouchableOpacity>
    )
}

class AddCardToTheDeck extends Component{

    state={

        question:'',
        answer:''

    }

    submit = () => {
        const { title } = this.props.navigation.state.params
        const { dispatch } = this.props
        const { navigation } = this.props;
        const { question, answer } = this.state

        if (question === '' || answer ==='' ) {
            alert("The Question or Answer shouldn't be empty")

        } else {

            const newCard = {
                question,
                answer
            }

            //  add new deck to redux
            dispatch(addCard({ newCard, title}))
            // add new deck to DB 
            addCardToDeck(title, newCard)

            this.setState({
                question: '',
                answer: ''
            })

            //Go to Deck page 
            navigation.goBack()
            
        }
    }

    render(){
        return(
            <View style={styles.container}>

                <TextInput style={styles.input}
                    placeholder=" write a question "
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    value={this.state.question}
                    onChangeText={text => this.setState({ question: text })} />

                <TextInput style={styles.input}
                    placeholder=" write answer "
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    value={this.state.answer}
                    onChangeText={text => this.setState({ answer: text })} />

                <SubmitButton onPress={this.submit} />
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

export default connect(mapStateToProps)(AddCardToTheDeck)