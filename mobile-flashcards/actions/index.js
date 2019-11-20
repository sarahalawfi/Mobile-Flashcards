export const ADD_DECK = "ADD_DECK"
export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK"
export const RECEIVE_CARDS ="RECEIVE_CARDS"


export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }

}

export function addDeck (deck){
    return{
        type: ADD_DECK,
        deck
    }
}

export function addCardToDeck(deckId,card){
    return{
        type: ADD_CARD_TO_DECK,
        card,
        deckId
    }
}

export function receiveCards(cards){
    return{
        type: RECEIVE_CARDS,
        cards
    }
}

//fetch initialData