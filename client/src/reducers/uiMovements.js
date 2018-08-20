import _ from 'lodash'
import { getDispatchHandler } from '../utils'

export const SET_TO_EDIT = 'SET_TO_EDIT'
export const REMOVE_FROM_EDIT = 'REMOVE_FROM_EDIT'


export function setToEdit(id) {
  return (dispatch, getState) => {
    const { todoList } = getState()
    const todoItem = _.findLast(todoList, todo => todo.id === id)

    dispatch({
      type: SET_TO_EDIT,
      payload: { todoItem },
    })
  }
}

export function removeFromEdit(id = null) {
  return (dispatch, getState) => {
    const { uiMovements } = getState()
    if (!id || uiMovements.editingTodo.id === id) {
      dispatch({
        type: REMOVE_FROM_EDIT,
        payload: {},
      })
    }
  }
}

export function unsetEdit() {
  return getDispatchHandler(SET_TO_EDIT, { todoItem: {} })
}

const initialState = { editingTodo: {} }

export default function uiMovements(state = initialState, action) {
  switch (action.type) {
    case SET_TO_EDIT: {
      return { ...state, editingTodo: action.payload.todoItem }
    }
    case REMOVE_FROM_EDIT: {
      return { ...state, editingTodo: {} }
    }
    default:
      return state
  }
}
