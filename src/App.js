import React, {Component} from 'react';
import Particles from 'react-tsparticles';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      enable: false
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
      value: 3
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
      box: {},
      route: 'signin', /* route keeps track of where we are in the page */
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: input})

    app.models.predict(
        'a403429f2ddf4b49b307e318f00e528b', 
        input) /* it seems like it'd be easier to just change imageUrl here, but that would 
                              cause a 400 error (bad request) */
      .then(response => 
        this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log('error', err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return ( 
      <div className="App">
        <Particles
          id="tsparticles" className='particles'
          options={particlesOptions}
          /> {/* this is from the react-particles-js package */}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' /* ternary if */
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit} /> {/* we need the this to access that function 
                                                                  which is a method of the App class  */}
            <FaceRecognition box={box} imageUrl={imageUrl} /> {/* the way this works is, 
                                                      here in the App.js container u define these props for
                                                      its children, so u will pass them to the children as 
                                                      props, so they'll be able to access them and use them
                                                      within their own code. they receive them as sort of 
                                                      parameters in their function, which they can access 
                                                      with props.box or props.imageUrl unless they 
                                                      destructure them like ({box, imageUrl}) so then they 
                                                      can use them like box or imageUrl. */} 
            </div>
          : ( /* nested ternary */
            route === 'register'
            ? <Register onRouteChange={this.onRouteChange} />
            : <Signin onRouteChange={this.onRouteChange} />
          )
        }
      </div>    
    );
  }
}

export default App;
