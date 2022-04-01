import React, {Component} from 'react';
import Particles from 'react-tsparticles';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'a2e8b2c805844ee28aa6be45406595fb',
});

const particlesOptions = { // config for the react-particles-js package
  background: {
    color: {
      value: "none"
    }
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push"
      },
      onHover: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: "#ffffff"
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 3,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 140
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    // console.log('oninputchange1 input', this.state.input);
    // console.log('oninputchange1 url', this.state.imageUrl);
    this.setState({input: event.target.value});
    // console.log('oninputchange2 inp', this.state.input);
    // console.log('oninputchange2 url', this.state.imageUrl);
  }

  onButtonSubmit = () => {
    // console.log('onbuttonsubmit1 inp', this.state.input);
    // console.log('onbuttonsubmit1 url', this.state.imageUrl);
    this.setState({imageUrl: this.state.input})

    // console.log('onbuttonsubmit1 inp', this.state.input);
    // console.log('onbuttonsubmit1 url', this.state.imageUrl);

    app.models.predict(
        'a403429f2ddf4b49b307e318f00e528b', 
        this.state.input) /* it seems like it'd be easier to just change imageUrl here, but that would 
                              cause a 400 error (bad request) */
      .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      }, 
      function(err) {
        console.log('error', err)
      }
    );
  }

  render() {
    return ( 
      <div className="App">
        <Particles
          id="tsparticles" className='particles'
          options={particlesOptions}
          /> {/* this is from the react-particles-js package */}
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit} /> {/* we need the this to access that function 
                                                                  which is a method of the App class  */}
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
