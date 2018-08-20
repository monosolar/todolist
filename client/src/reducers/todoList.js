import _ from 'lodash'
import { getDispatchHandler } from '../utils'
import TodosTypes from '../components/item/TodosTypes'

export const ADD_TODO = 'ADD_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const REORDER_TODO = 'REORDER_TODO'
export const APPLY_TODOS = 'APPLY_TODOS'


export function addTodo(todoItem) {
  return getDispatchHandler(ADD_TODO, todoItem)
}

export function editTodo(id, todoItem) {
  return getDispatchHandler(EDIT_TODO, { id, todoItem })
}

export function makeTodoDone(id) {
  return getDispatchHandler(EDIT_TODO, {
    id,
    todoItem: { type: TodosTypes.DONE },
  })
}

export function editTodoText(id, text) {
  return getDispatchHandler(EDIT_TODO, {
    id,
    todoItem: { text },
  })
}

export function reorderTodos(fromIdx, toIdx) {
  return getDispatchHandler(REORDER_TODO, { fromIdx, toIdx })
}

export function removeTodo(id) {
  return getDispatchHandler(REMOVE_TODO, { id })
}

export function applyTodos(todoList) {
  return { type: APPLY_TODOS, payload: { todoList } }
}

const initialState = [
  /* { text: 'Blala', type: 'TO_DO', id: 1 },
  { text: 'FEFadfasfd', type: 'TO_DO', id: 3 },
  { text: '23245', type: 'DONE', id: 4 },
  { text: ')()()()()()()()(', type: 'TO_DO', id: 5 }, */
  { text: 'FrontFront', type: 'TO_DO', id: 6 },/* 
  { text: '0000000', type: 'DONE', id: 7 },
  { text: 'BBBBBBBBBBBB', type: 'TO_DO', id: 8 },
  { text: 'JFEJFIEJFIJ', type: 'TO_DO', id: 9 },
  { text: 'FIUWF(G@R@GE*', type: 'DONE', id: 2 }, */
]

export default function todoList(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const todoItem = action.payload

      todoItem.id = getNextListId(state)
      return [...state, todoItem]
    }

    case EDIT_TODO: {
      const newTodoItem = action.payload.todoItem
      const todoItemIdx = _.findLastIndex(state, todo => todo.id === action.payload.id)

      if (todoItemIdx !== -1) {
        state[todoItemIdx] = { ...Object.assign(state[todoItemIdx], newTodoItem) }
        return [...state]
      }
      return state
    }

    case REMOVE_TODO: {
      const todoItemIdx = _.findLastIndex(state, todo => todo.id === action.payload.id)
      if (todoItemIdx === -1) { return state }

      state.splice(todoItemIdx, 1)

      return [...state]
    }

    case REORDER_TODO: {
      state.splice(action.payload.toIdx, 0, state.splice(action.payload.fromIdx, 1)[0])
      return [...state]
    }

    case APPLY_TODOS: {
      return action.payload.todoList
    }

    default:
      return state
  }
}

function getNextListId(list) {
  const maxListId = parseInt(Math.max.apply(this, list.map(todo => todo.id))) || 0
  return maxListId + 1
}
