export const fetchData = () => {
    return (dispatch) => {

      fetch('./workflow_data.json')
        .then((response) => response.json())

        .then((data) => {
          dispatch({
            type: 'FETCH_DATA_SUCCESS',
            payload: data,
          });
        })
        
        .catch((error) => {
          dispatch({
            type: 'FETCH_DATA_ERROR',
            payload: error.message,
          });
        });
    };
  };