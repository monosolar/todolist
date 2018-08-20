import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from '../components/Button'
import TodosTypes from '../components/item/TodosTypes'
import { addTodo, editTodo } from '../reducers/todoList'
import { unsetEdit } from '../reducers/uiMovements'


class InputModule extends React.PureComponent {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    unsetEdit: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    uiMovements: PropTypes.shape({
      editingTodo: PropTypes.object,
    }),
    todoList: PropTypes.array.isRequired,
  }

  static defaultProps = {
  }

  state = { inputText: '', editingTodo: {} }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { uiMovements: { editingTodo } } = nextProps
    const { editingTodo: editingTodoPrev } = prevState

    if (!_.isEqual(editingTodo, editingTodoPrev)) {
      return { editingTodo, inputText: _.defaultTo(editingTodo.text, '') }
    }

    return null
  }

  addButtonHandler = () => {
    const { addTodo } = this.props

    if (this.state.inputText.length) {
      addTodo({
        text: this.state.inputText,
        type: TodosTypes.TO_DO,
      })
      this.setInputText()
    }
  }

  editButtonHandler = () => {
    const { uiMovements: { editingTodo }, editTodo } = this.props
    editTodo(editingTodo.id, { ...editingTodo, text: this.state.inputText })
    this.cancelButtonHandler()
  }

  cancelButtonHandler = () => {
    const { unsetEdit } = this.props
    unsetEdit()
    this.setInputText()
  }

  handleInputTextChange = (event) => {
    this.setInputText(event.target.value)
  }

  setInputText = (text = '') => {
    this.setState({ inputText: text })
  }

  render() {
    const { editingTodo } = this.props.uiMovements
    const isEdit = 'id' in editingTodo

    return (
      <div className="input">
          <input
            type="text"
            value={this.state.inputText}
            onChange={this.handleInputTextChange}
            className={isEdit ? 'inputEdit' : ''}
          />
          <div>
            {isEdit ? [
              <Button key="EditButton" title="Apply" onClick={this.editButtonHandler} />,
              <Button key="CancelButton" title="Cancel" onClick={this.cancelButtonHandler} />,
            ] : (
              <Button title="Add" onClick={this.addButtonHandler} />
            )}
          </div>
        </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: bindActionCreators(addTodo, dispatch),
    editTodo: bindActionCreators(editTodo, dispatch),
    unsetEdit: bindActionCreators(unsetEdit, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    uiMovements: state.uiMovements,
    todoList: state.todoList,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputModule)
