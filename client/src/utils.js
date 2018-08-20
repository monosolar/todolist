/** **REDUCERS*** */
export const getDispatchHandler = (actionType, payload) => (
  (dispatch) => {
    dispatch({
      type: actionType,
      payload,
    })
  }
)
