import * as React from 'react';
import * as _ from 'lodash';
import { connect } from "react-redux";

import { StoreState } from "../../redux/Store";
import { Actions as JokesActions, Joke } from "../../redux/JokesRedux";
interface Props {
  randomJokes: Joke[],
  likedJokes: Joke[],

  randomLikeSystem: boolean,
  jokesError?: string,

  token: string,

  getJokes: () => void,
  getLikedJokes: () => void,

  likeRandomJoke: () => void,
  likeJoke: (joke: Joke) => void,
  dislikeJoke: (jokeId: number) => void,

  toggleRandomLikeSystem: () => void,
}
interface State {

}
class JokesScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }// end constructor()
  componentDidMount() {
    /*
     * Get Jokes
     */
    this.props.getJokes();

    /*
     * Get Liked Jokes, only when user is logged in
     */
    if (this.props.token.length > 0) {
      this.props.getLikedJokes();
    }// end if
  }// end componentDidMount()
  componentWillReceiveProps(nextProps: Props){

    if(!_.isEqual(nextProps.jokesError, this.props.jokesError)){
      if(nextProps.jokesError)
        window.alert(nextProps.jokesError);
    }// end if

    if(nextProps.randomLikeSystem == true && nextProps.likedJokes.length < 10){
      window.setTimeout(() => {
        this.props.likeRandomJoke();
      }, 5000);
    }

  }// componentWillReceiveProps()
  renderJoke(joke: Joke, index: number) {
    if(!joke) return null;
    return (
      <div key={index}>
        {joke.joke}
        <button onClick={() => { this.props.likeJoke(joke) }} >Like</button>
      </div>
    );// end return()
  }// end renderJoke()
  renderJokes() {
    return (
      <div>
        <h2>Random Jokes</h2>
        {
          this.props.randomJokes.map((joke, index) => {
            return this.renderJoke(joke, index);
          })
        }
      </div>
    );// end return()
  }// end renderJokes()
  renderLikedJoke(joke: Joke, index: number) {
    if(!joke) return null;
    return (
      <div key={index}>
        {joke.joke}
        <button onClick={() => { this.props.dislikeJoke(joke.id) }} >Remove Like</button>
      </div>
    );// end return()
  }// end renderLikedJoke()
  renderLikedJokes() {
    return (
      <div>
        <h2>Liked Jokes</h2>
        {
          this.props.likedJokes.map((joke, index) => {
            return this.renderLikedJoke(joke, index);
          })
        }
      </div>
    );// end return()
  }// end renderLikedJokes()
  render() {
    return (
      <div>
        <h2>Jokes Screen</h2>
        <button onClick={() => this.props.toggleRandomLikeSystem()}>{(this.props.randomLikeSystem)?"Turn Off Random Likes": "Turn On Random Likes"}</button>
        {this.renderJokes()}
        {(this.props.token.length > 0) ? this.renderLikedJokes() : null}
      </div>
    );// end return()
  }// end render()
}// end JokesScreen

function mapStateToProps(state: StoreState) {
  return {
    randomJokes: state.jokes.random_jokes,
    likedJokes: state.jokes.liked_jokes,

    randomLikeSystem: state.jokes.random_like_system,
    jokesError: state.jokes.error,

    token: state.session.token,
  }//end return
}//end mapStateToProps()

function mapDispatchToProps(dispatch: any) {
  return {
    getJokes: () => dispatch(JokesActions.GetJokesAsync()),
    getLikedJokes: () => dispatch(JokesActions.GetLikedJokesAsync()),

    likeRandomJoke: () => dispatch(JokesActions.LikeRandomJokeAsync()),
    likeJoke: (joke: Joke) => dispatch(JokesActions.LikeJokeAsync(joke)),
    dislikeJoke: (jokeId: number) => dispatch(JokesActions.DislikeJokeAsync(jokeId)),

    toggleRandomLikeSystem: () => dispatch(JokesActions.ToggleRandomLikeSystem())
  }//end return
}//end mapDispatchToProps()

export default connect(mapStateToProps, mapDispatchToProps)(JokesScreen);