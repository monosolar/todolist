import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reorderTodos } from '../reducers/todoList'
import TodoItem from '../components/item/TodoItem'

class ListModule extends React.Component {
  static propTypes = {
    reorderTodos: PropTypes.func.isRequired,
    todoList: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)

    this.dragToIndex = null
    this.dragFromIndex = null
    this.todosContainerDom = null
    this.draggingTodoDom = null
    this.shadowTodoDom = null
  }


  dragStartHandler = (e) => {
    this.draggingTodoDom = e.target
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', this.draggingTodoDom)

    this.dragFromIndex = e.target.getAttribute('todo-id')
    this.shadowTodoDomItem = getShadowClone(e.target)
  }

  dragEndHandler = () => {
    this.draggingTodoDom.style.display = 'flex'
    this.shadowTodoDomItem.remove()

    this.props.reorderTodos(this.dragFromIndex, this.dragToIndex)
  }

  dragOverHandler = (e) => {
    this.draggingTodoDom.style.display = 'none'
    const overTodoItemId = parseInt(e.target.getAttribute('todo-id'))

    if (!Number.isNaN(overTodoItemId)) {
      this.todosContainerDom.insertBefore(this.shadowTodoDomItem, e.target)
      this.dragToIndex = this.dragFromIndex < overTodoItemId ? overTodoItemId - 1: overTodoItemId
    }
  }

  render() {
    return (
      <ul
        ref={ (todosContainer) => { this.todosContainerDom = todosContainer }}
        className="todo-list"
        onDragOver={this.dragOverHandler}
      >
        {this.props.todoList.map((todoItem, idx) => (
          <TodoItem
            idx={idx}
            key={todoItem.id}
            data={todoItem}
            onDragStart={this.dragStartHandler}
            onDragEnd={this.dragEndHandler}
          />))}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    todoList: state.todoList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    reorderTodos: bindActionCreators(reorderTodos, dispatch),
  }
}

function getShadowClone(domItem) {
  const domItemShadow = domItem.cloneNode(true)
  domItemShadow.className = 'todo-item-shadow'
  domItemShadow.setAttribute('todo-id', NaN)

  return domItemShadow
}

export default connect(mapStateToProps, mapDispatchToProps)(ListModule)
