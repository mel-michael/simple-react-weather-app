import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="title">Simply</div>
        <div className="right">
          <input type="text" />
          <button>Check weather</button>
        </div>
      </div>
    )
  }
}

export default Header;