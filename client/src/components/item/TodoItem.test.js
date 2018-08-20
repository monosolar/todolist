/* 
import jest from 'jest'
import { shallow } from 'enzyme' */

import { TodoItem } from './TodoItem'
import TodosTypes from './TodosTypes'

describe('<ErrorPopup />', () => {
  describe('render', () => {
    it('should to do something', () => {
      const mockedExternalHandler = jest.fn()
      const wrapper = shallow(
        <TodoItem
          removeTodo={mockedExternalHandler}
          makeTodoDone={mockedExternalHandler}
          setToEdit={mockedExternalHandler}
          removeFromEdit={mockedExternalHandler}
          idx={0}
          data={{ id: 0, text: 'Unknown', type: TodosTypes.TO_DO }}
          onDragStart={mockedExternalHandler}
          onDragEnd={mockedExternalHandler}
        />,
      )
      console.log('Wrapper',wrapper)
      expect(wrapper.childAt(1).name()).toBe('Text')
    })
  })
})
