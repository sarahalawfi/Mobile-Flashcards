import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button} from "react-native-elements";
import { View, Text, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'
import { AppStyles } from "../AppStyles";



class DeckDetail extends Component{
    render(){
        const { title}= this.props
        const { navigate } = this.props.navigation;
        const cardQuestions =this.props.state[title].questions
        
        return(
         
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.title}>{`${cardQuestions.length} Cards `}</Text>
                <Button
                    backgroundColor={purple}
                    title="ADD CARD"
                    buttonStyle={styles.buttonStyle}
                    onPress={() => navigate('AddCardToTheDeck', { title })}/>
               
                <Button
                    backgroundColor={purple}
                    title="START QUIZ"
                    buttonStyle={styles.buttonStyle}
                    onPress={() => navigate('Quiz', { title, cardQuestions })}/>
                   
            </View>

       )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 150
    },
    buttonStyle: {
        marginBottom: 10
    },
    title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: "bold",
        color: AppStyles.color.tint,
        marginTop: 20,
        textAlign: "center",
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20
    },
});


function mapDispatchToProps(state, { navigation }) {
    const { title } = navigation.state.params
    return{
        state,
        title
    }

}


export default connect(mapDispatchToProps)(DeckDetail)