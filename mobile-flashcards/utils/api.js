import { AsyncStorage } from 'react-native'


export const FLASHCARDS_STORAGE_KEY = "MobileFlashCards:Decks"

 const initalData = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

// return all of the decks along with their titles, questions, and answers. 
export function getDecks(){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => {
    if(results === null){
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initalData));
        return initalData;
    }
        return JSON.parse (results);
    });
        

}

// return the deck associated with that id.
export function getDeck(id){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results =>{
        decks = JSON.parse(results)
        return decks[id]
    })

}

// add new Deck to Decks
export function saveDeckTitle(title){
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]:{
            title,
            questions: []
        }
    }))
}

// add the card to the list of questions for the deck with the associated title. 
export function addCardToDeck(title, card){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results =>{
        data=JSON.parse(results)
        data[title].questions.push(card)
        return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })

 }