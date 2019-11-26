import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Card, Button, Divider } from "react-native-elements";
import { purple, white, black, red, gray} from '../utils/colors'
import FlipCard from 'react-native-flip-card'
import ResultPage from './ResultPage'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import * as Permissions from 'expo-permissions';



function SubmitButton({ text, onPress }) {
    return (
        <TouchableOpacity
            style={styles.iosSubmitBtn, { backgroundColor: (text === 'Correct' ? 'red' : 'gray'), marginTop: 30, }}
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
        result: false,
        totalQuestions:undefined
    }
componentDidMount() {
    const { cards, deckLength } = this.props;
    this.setState({
        questions: cards,
        totalQuestions: cards.length

    }
    );
   
}
    RestartQuiz = () => {
        const { questions}=this.state
        this.setState(() => ({ questions: questions , currentQuestion: 0, correctAnswers: 0, flip: true, result: false, totalQuestions: undefined }))
        this.ShowQues()
    };

    ShowQues = () => {
        const { currentQuestion, totalQuestions } = this.state;

        if (currentQuestion < totalQuestions) {
            this.setState(prevState => {
                return {
                    currentQuestion: prevState.currentQuestion + 1

                }
            })
        }

            clearLocalNotification()
                .then(setLocalNotification)
    }

    handleCorrect = () => {
        const {  currentQuestion,totalQuestions } = this.state;
        this.setState(prevState=>{
            return{
                correctAnswers: prevState.correctAnswers + 1}

            }
            );
        
            this.ShowQues()
        
        console.log(this.state.currentQuestion)

    }


    handleIncorrect = () => {
        this.ShowQues()
    }

   

    
    //flip between q and a view 
    switchAnswer = () =>{
        this.setState(prevState=>{ 
            return {
                flip: !prevState.flip }
        })
    }

    render() {
        const { questions, result, currentQuestion, correctAnswers, totalQuestions, flip } = this.state;
        const { title } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;

        const qustionNum = <View>
            <Text style={{ alignItems: 'center', fontSize: 20 }}>{currentQuestion+1}/{totalQuestions} 
            </Text>
        </View>
        return (
            <ScrollView>
                {currentQuestion < questions.length ? (
                    <View>
                      
                    <Card
                     title={qustionNum}
                        titleStyle={styles.title}>
                        <FlipCard
                            friction={12}
                            perspective={2000}
                            flipHorizontal={true}
                            flipVertical={false}
                            flip={flip}
                            clickable={true}
                            alignHeight={false}
                            style={{
                                borderRadius: 4,
                                borderWidth: 0.5,
                                borderColor: black,
                                alignItems: "center",
                                marginBottom: 15
                            }}
                            onPress={() => {
                                console.log("");
                            }}
                        >
                            <View>
                                <Text style={styles.flipCard}>
                                    {questions[currentQuestion].answer}
                                </Text>
                            </View>

                            <View>
                                    <Text style={styles.flipCard}>{questions[currentQuestion].question}</Text>
                            </View>

                        </FlipCard>
                            <Text>
                                Touch the question to see the answer
                           </Text>
                            <View style={styles.container}>
                                <TouchableOpacity
                                    style={styles.iosSubmitBtn, { backgroundColor:  'red', marginTop: 30, }}
                                    onPress={this.handleCorrect}>
                                    <Text style={styles.submitBtnText}>Correct</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.iosSubmitBtn, { backgroundColor: 'gray', marginTop: 30, }}
                                    onPress={this.handleIncorrect}>
                                    <Text style={styles.submitBtnText}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>
                    
                    </Card>
                    </View>
                ) : (
                        <ResultPage
                            totalQuestions={totalQuestions}
                            correct={correctAnswers}
                            navigate={navigate}
                            title={title}
                            RestartQuiz={this.RestartQuiz} />
                    )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    buttonStyle: {
        marginBottom: 10
    },
    title: {
        fontSize: 20
        
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
});
function mapStateToProps(state,  { navigation }) {
    const { title,questions } = navigation.state.params;
    const cards = state[title].questions;
    const deckLength = cards.length;

    return {
        state,
        cards,
        deckLength
    }
}

export default connect(mapStateToProps)(Quiz)