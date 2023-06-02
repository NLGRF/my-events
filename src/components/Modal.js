import React, { useState, useEffect, useCallback }  from "react";
import ReactDOM from "react-dom";

const Modal = ({ onClose, children, title }) => {
  // message data from the event
  const [msgData, setMsgData] = useState();
  // connect to the event
  // const eventSource = new EventSource('http://localhost:3001/sse');
  const eventSource = new EventSource('http://localhost:3001/stocksFind');

  eventSource.onmessage = ({data}) => {
    // console.log('New message', JSON.parse(data));
    // setMsgData(data)
    // if (JSON.parse(data).symbol === 'Stock #2' && JSON.parse(data).bid === '100') {
    //   setMsgData(data)
    // }
    // loop through the data and check if the symbol is Stock #2 and the bid is 100
    JSON.parse(data).forEach((stock) => {
      // console.log('stock', stock)
      if (stock.symbol === 'Stock #2' && stock.bid === 100) {
        setMsgData(data)
      }
    }
    )
  };

  // create ref for the StyledModalWrapper component
  const modalWrapperRef = React.useRef();

  // check if the user has clicked inside or outside the modal
  // useCallback is used to store the function reference, so that on modal closure, the correct callback can be cleaned in window.removeEventListener
  const backDropHandler = useCallback(e => {
      if (!modalWrapperRef?.current?.contains(e.target)) {
          onClose();
      }
  }, []);

  // if have a message, log it to the console and close the modal
  useEffect(() => {
    if (msgData) {
      // console.log('New message', JSON.parse(msgData));
      onClose();
    }
  }, [msgData]);

  useEffect(() => {
      // We wrap it inside setTimeout in order to prevent the eventListener to be attached before the modal is open.
      setTimeout(() => {
          window.addEventListener('click', backDropHandler);
      })
  }, [])

  useEffect(() => {
      // remove the event listener when the modal is closed
      return () => window.removeEventListener('click', backDropHandler);
  }, []);

  const handleCloseClick = (e) => {
      e.preventDefault();
      onClose();
  };

  const modalContent = (
      <div className="modal-overlay">
          {/* Wrap the whole Modal inside the newly created StyledModalWrapper
          and use the ref */}
          <div ref={modalWrapperRef} className="modal-wrapper">
              <div className="modal">
                  <div className="modal-header">
                      <a href="#" onClick={handleCloseClick}>
                          x
                      </a>
                  </div>
                  {title && <h1>{title}</h1>}
                  <div className="modal-body">{children}</div>
              </div>
          </div>
      </div>
  );

  return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
  );
};

export default Modal
