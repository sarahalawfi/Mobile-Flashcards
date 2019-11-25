import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Card, Button, Divider } from "react-native-elements";
import { purple, white ,black} from '../utils/colors'



function SubmitButton({ text, onPress }) {
    return (
        <TouchableOpacity
            style={styles.iosSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText} >{text}</Text>
        </TouchableOpacity>
    )
}


class Quiz extends Component {
    state={
        questions:[],
        currentQuestion:0,
        correctAnswers: 0,
        flip: true,
        done: 1,
        result: false,
        totalQuestions:undefined
    }
componentDidMount() {
    const { cards, deckLength } = this.props;
    this.setState({
        questions: cards,
        totalQuestions: deckLength

    });

    ShowQues = () => {
        const { questions, currentQuestion, totalQuestions} = this.state;

        // if (done === totalQuestions){
        //     this.setState({
        //         result:true
        //     })
        // } else 
        if (questions[currentQuestion] !== undefined){
            return questions[currentQuestion].question;
        }
        

    }

    handleCorrect = ()=>{
        const { done, currentQuestion } = this.state;

            this.setState((prevState) => {
                return {
                    done: done + 1,
                    currentQuestion: prevState.currentQuestion + 1,
                    correctAnswers: prevState.correctAnswers + 1
                };
            });
        
}

    handleIncorrect = () => {
        const { done } = this.state;

            this.setState((prevState) => {
                return {
                    done: done + 1,
                    currentQuestion: prevState.currentQuestion + 1,
                };
            });


    }
    
    //flip between q and a view 
    switchAnswer = () =>{
        this.setState({ 
            flip: !this.state.flip 
        })
    }
}
    render() {
        const { done, questions, result, currentQuestion, totalQuestions, flip } = this.state;

        return (
            <ScrollView>
                <View>
                <Text>{done}/{totalQuestions}</Text>
                </View>
                {currentQuestion < questions.length ?
                    <Card
                        title={this.ShowQues}
                        titleStyle={styles.title}
                       >
                            <View>
                            <Text style={styles.CardStyle}>{questions[currentQuestion].question}</Text>
                            </View>
                            <View>
                                <Text style={styles.CardStyle}>
                                    {questions[currentQuestion].answer}
                                </Text>
                            </View>
                    
                        <Divider style={styles.divider} />
                        <Button
                            backgroundColor={purple}
                            title="Show Answer"
                            buttonStyle={styles.buttonStyle}
                            onPress={this.switchAnswer}
                        />
                        <View >
                            <SubmitButton text='Correct' onPress={this.handleCorrect} />
                            <SubmitButton text='Incorrect' onPress={this.handleIncorrect} />
                        </View>
                    </Card>
                     : <View style={styles.border}>
                        <Text>Result</Text>
                    </View>

                }
                </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        marginBottom: 10
    },
    title: {
        fontSize: 20
    },
    divider: {
        marginTop: 10,
        marginBottom: 10
    },
    CardStyle: {
        fontSize: 20,
        padding: 10,
    },
    border: {
        marginTop: 50,
        alignItems: 'center',
    },
    subheading: {
        fontSize: 20,
        textAlign: 'center',
        color: purple
    },
    heading: {
        textAlign: 'center',
        color: black,
    }
});
function mapStateToProps(state,  { navigation }) {
    const { title } = navigation.state.params;
    const cards = state[title].questions;
    const deckLength = cards.length;

    return {
        state,
        cards,
        deckLength
    }
}

export default connect(mapStateToProps)(Quiz)