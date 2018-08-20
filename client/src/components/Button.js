import React from 'react'
import PropTypes from 'prop-types'

export default function Button({ title, onClick }) {
  return (
    <div className="common-button" onClick={onClick}>
      {title}
    </div>
  )
}

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
}
Button.defaultProps = {
  title: 'button',
  onClick: null,
}
