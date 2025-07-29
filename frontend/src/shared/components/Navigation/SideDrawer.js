import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

const SideDrawer = (props) => {
  const drawerRef = useRef(null); // ✅ nodeRef for CSSTransition

  return (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
      nodeRef={drawerRef} // ✅ Pass nodeRef to avoid findDOMNode error
    >
      <aside className="side-drawer" ref={drawerRef} onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );
};

export default SideDrawer;
