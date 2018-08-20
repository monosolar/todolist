import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import TodosTypes from './TodosTypes'
import Button from '../Button'
import { removeTodo, makeTodoDone } from '../../reducers/todoList'
import { setToEdit, removeFromEdit } from '../../reducers/uiMovements'

class TodoItem extends React.PureComponent {
  static propTypes = {
    removeTodo: PropTypes.func.isRequired,
    makeTodoDone: PropTypes.func.isRequired,
    setToEdit: PropTypes.func.isRequired,
    removeFromEdit: PropTypes.func.isRequired,
    idx: PropTypes.number.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.oneOf([TodosTypes.TO_DO, TodosTypes.DONE]),
    }),

    onDragStart: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
  }

  static defaultProps = {
    data: {
      text: 'New task',
    },
  }

  doneClickHandler = () => {
    const { data, makeTodoDone, removeFromEdit } = this.props
    makeTodoDone(data.id)
    removeFromEdit(data.id)
  }

  removeClickHandler = () => {
    const { data, removeTodo, removeFromEdit } = this.props
    removeTodo(data.id)
    removeFromEdit(data.id)
  }

  itemClickHandler = () => {
    const { data, setToEdit } = this.props
    if (data.type === TodosTypes.TO_DO) { setToEdit(data.id) }
  }

  render() {
    const {
      data, idx, onDragStart, onDragEnd,
    } = this.props
    
    const isTodo = data.type === TodosTypes.TO_DO

    return (
      <li todo-id={idx} draggable="true" onDragStart={onDragStart} onDragEnd={onDragEnd} >
        <div
          onClick={this.itemClickHandler}
          className={classnames('todo-item-text', isTodo ? 'cursor-pointer' : 'item-done')}
        >
          {data.text}
        </div>

        <div className="todo-item-buttons-container" >
          {data.type === TodosTypes.TO_DO && (
            <Button title="Done" onClick={this.doneClickHandler} />
          )}
          <Button title="Remove" onClick={this.removeClickHandler} />
        </div>
      </li>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeTodo: bindActionCreators(removeTodo, dispatch),
    makeTodoDone: bindActionCreators(makeTodoDone, dispatch),
    setToEdit: bindActionCreators(setToEdit, dispatch),
    removeFromEdit: bindActionCreators(removeFromEdit, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(TodoItem)
