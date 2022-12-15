import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { imageSrc,  playing, index, playSound } = this.props;

    return (
      <div
        data-key={index + 1}
        className={`button${playing ? ' playing' : ''}`}
        onClick={playSound}
      >
        <img src={imageSrc} alt="drumkit button" />
        <h3 className={index + 1}></h3>
      </div>
    );
  }
}

export default Button;