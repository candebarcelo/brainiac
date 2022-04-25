import React, {Component} from 'react';
import Particles from 'react-tsparticles';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import './App.css';


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
      speed: 1,
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
      value: 2
    }
  },
  detectRetina: true
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin', /* route keeps track of where we are in the page */
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
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

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input}); 
      fetch('https://limitless-fjord-45877.herokuapp.com/imageurl', {
        method: 'post', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://limitless-fjord-45877.herokuapp.com/image', {
            method: 'put', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => { // this is to update the number of entries after submitting a picture
              this.setState(Object.assign(this.state.user, { entries: count })) /* we only want to reassign 
                                                    the value of the entries for that user, not the whole 
                                                    user. so to do that, we use Object.assign() which takes 
                                                    as parameters: 1st, what state u want to update, and 
                                                    2nd, its new key and value. */
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log('error', err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { user, isSignedIn, box, imageUrl, route } = this.state;
    return ( 
      <div className="App">
        <Particles
          id="tsparticles" className='particles'
          options={particlesOptions}
          /> {/*this is from the react-particles-js package*/}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}  />
        { route === 'home' /* ternary if */
          ? <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onPictureSubmit={this.onPictureSubmit} /> {/* we need the this to access that function 
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
            ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          ) /* we could make a form component to use on register and signin, bc we did a lot of copy and 
              pasting, so as to make them smaller */
        } 
      </div>    
    );
  }
}

export default App;
