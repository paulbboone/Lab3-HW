import React, { Component } from "react";
import "./App.css";
import Button from "./components/Button";

import { sound } from "./components/Sound";

class App extends Component {
  constructor() {
    super();
    this.playSound = this.playSound.bind(this);
    this.state = {
      sound: sound,
    };
  }

  componentDidMount() {
    this.setState({
      sound: this.state.sound.map((sound) => {
        return { ...sound, audioObj: new Audio(sound.audioSrc) };
      }),
    });

    window.addEventListener("keydown", this.playSound);
  }

  playSound(e) {
 
    let eventIndex;
    let keyCode = e.keyCode;

  
    if (keyCode) {
  
      if (keyCode > 48 && keyCode < 57) {
        eventIndex = keyCode - 49;
      
      } else {
        return;
      }
    } else {
      eventIndex = parseInt(e.currentTarget.dataset.key, 10) - 1;
    }

    const audio = this.state.sound[eventIndex].audioObj;

    audio.currentTime = 0;
    audio.play();

    this.setState({
      sound: this.state.sound.map((sound, index) => {
        if (eventIndex === index) {
          return { ...sound, playing: true };
        }
        return sound;
      }),
    });

    setTimeout(() => {
      this.setState({
        sound: this.state.sound.map((sound, index) => {
          if (eventIndex === index) {
            return { ...sound, playing: false };
          }
          return sound;
        }),
      });
    }, 70);
  }

  render() {
    const renderButtons = this.state.sound.map((sound, index) => {
      return (
        <Button
          key={sound.audioSrc}
         
          imageSrc={sound.imageSrc}
          isDarkText={sound.isDarkText}
          playing={sound.playing}
          index={index}
          playSound={this.playSound}
        />
      );
    });

    return <section id="drumkit">{renderButtons}</section>;
  }
}

export default App;