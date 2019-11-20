import{
    ADD_DECK,
    RECEIVE_DECKS,
    ADD_CARD_TO_DECK,
    RECEIVE_CARDS
}from '../actions/index'

export default function decks (state={}, action){
    switch(action.type){
        case RECEIVE_DECKS:
            return{
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return{
                ...state,
                ...{
                    ...state,
                    [action.deck.title]:action.deck,
                }
            }
        case ADD_CARD_TO_DECK:
            const title = action.card.title
            const addNewCard={
                ...state,
                [title]:{
                    title,
                    questions: state[title].questions.concat([action.card.card])
                }
            }
            return{
                ...state,
                ...addNewCard
            }

        case RECEIVE_CARDS:
            return{
                ...state,
                ...action.cards
            }

        default:
            return state

    }
}

