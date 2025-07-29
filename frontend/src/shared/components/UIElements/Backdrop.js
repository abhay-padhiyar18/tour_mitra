import ReactDOM from 'react-dom';

const Backdrop = (props) => {
  const backdropElement = document.getElementById('backdrop-hook');
  if (!backdropElement) return null;

  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    backdropElement
  );
};

export default Backdrop;
