import React, { Component } from 'react';
import { purple } from '../utils/colors'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { Card, Button } from "react-native-elements";
import { withNavigation } from 'react-navigation';


//When the last question is answered, a score is displayed. This can be displayed as a percentage of correct answers or just the number of questions answered correctly.
//When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.
//Both the 'Restart Quiz' and 'Back to Deck' buttons route correctly to their respective views.

class ResultPage extends Component {
    render(){
        const { totalQuestions, correct, navigate, title, RestartQuiz, navigation } = this.props
   
        const cardQuestions = title.questions
        const Percent = (correct / totalQuestions) * 100.0
        return(
            <View>
                <Card title="Results" >
                    <Text>
                        You scored {correct}/{totalQuestions} questions  .
                   </Text>
                    <Text>Correct Answer: {Percent.toFixed(2)}</Text>
                    <Button
                        backgroundColor={purple}
                        title="Restart Quiz"
                        buttonStyle={styles.button}
                        onPress={() => {
                            RestartQuiz() ,
                                navigate(
                                    'Quiz',
                                    { title, cardQuestions})    
                        }}
                    />
                    <Button
                        backgroundColor={purple}
                        title="Back to Deck"
                        buttonStyle={styles.button}
                        onPress={() => {
                            navigate("DeckDetail", {
                                title
                            });
                        }}
                    />
                </Card>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        marginBottom: 10
    }
});

export default withNavigation(ResultPage);