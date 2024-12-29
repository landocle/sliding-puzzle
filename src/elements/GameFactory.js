import React, { Component, createContext } from 'react';

import {
  swap,
  isNeighbour,
  swapSpace,
  shuffle,
  checkArray,
  gameState
} from '@Utils';

const NEW_GAME = '__new_game__';
const RESET_GAME = '__reset_game__';

const defaultTileCount = 15;
const defaultGridWidth = 4;

// e.g., [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
const genrateArray = (num, add) => {
  let puzzle = [...Array(num)].map((_, i) => i + add);
  puzzle.push(0);
  return puzzle;
};

const ValuesContext = createContext({});
const SetValueContext = createContext(() => {});

const isSolvable = (puzzle, gridWidth) => {
  let parity = 0;
  let row = 0;
  let blankRow = 0;
  for (let i = 0; i < puzzle.length; i++) {
    if (i % gridWidth == 0) {
      // advance to next row
      row++;
    }
    if (puzzle[i] == 0) {
      blankRow = row;
      continue;
    }
    for (var j = i + 1; j < puzzle.length; j++) {
      if (puzzle[i] > puzzle[j] && puzzle[j] != 0) {
        parity++;
      }
    }
  }

  if (gridWidth % 2 == 0) {
    if (blankRow % 2 == 0) {
      return parity % 2 == 0;
    } else {
      return parity % 2 != 0;
    }
  } else {
    return parity % 2 == 0;
  }
};

const genratePuzzle = (arr, event, gridWidth, tileCount) => {
  if (event === NEW_GAME) {
    if (isSolvable(arr, gridWidth)) {
      return arr;
    } else {
      return genratePuzzle(shuffle(genrateArray(tileCount, 1)), NEW_GAME, gridWidth, tileCount);
    }
  } else {
    return arr;
  }
};

class GameFactory extends Component {
  defaultState = (_event, num, gridWidth, tileCount) => ({
    numbers:
      _event === NEW_GAME
        ? genratePuzzle(shuffle(genrateArray(tileCount, num)), _event, gridWidth, tileCount)
        : shuffle(genrateArray(tileCount, num)),
    moves: 0,
    seconds: 0,
    gameState: gameState.GAME_IDLE,
    gridWidth: gridWidth,
    tileCount: tileCount 
  });

  state = this.defaultState(NEW_GAME, 1, defaultGridWidth, defaultTileCount);

  timerId = null;

  reset = () => {
    this.setState(this.defaultState(RESET_GAME, 0, this.state.gridWidth, this.state.tileCount));
    setTimeout(() => {
      this.setState(this.defaultState(NEW_GAME, 1, this.state.gridWidth, this.state.tileCount));
      if (this.timerId) {
        clearInterval(this.timerId);
      }
    }, 100);
  };

  gettingEmptyBoxLocation = () => {
    let location = this.state.numbers.indexOf(0);
    let column = Math.floor(location % this.state.gridWidth);
    let row = Math.floor(location / this.state.gridWidth);
    return [row, column, location];
  };

  move = (from, row, col, moveType) => {
    this.setState(prevState => {
      let newState = null;
      const [updated, newNumList] = swapSpace(
        prevState.numbers,
        from,
        row,
        col,
        moveType,
        this.state.gridWidth
      );
      if (updated) {
        newState = {
          number: newNumList,
          moves: prevState.moves + 1
        };
        if (prevState.moves === 0) {
          this.setTimer();
          newState = {
            ...newState,
            gameState: gameState.GAME_STARTED
          };
        }
        if (checkArray(this.state.numbers)) {
          clearInterval(this.timerId);
          newState = {
            ...newState,
            gameState: gameState.GAME_OVER
          };
        }
      }
      return newState;
    });
  };

  addTimer = () => {
    this.setState(prevState => {
      return { seconds: prevState.seconds + 1 };
    });
  };

  setTimer = () => {
    this.timerId = setInterval(() => {
      this.addTimer();
    }, 1000);
  };

  clickMove = from => {
    this.setState(prevState => {
      let newState = null;
      let to = prevState.numbers.indexOf(0);
      if (isNeighbour(to, from, this.state.gridWidth)) {
        const newNumList = swap(prevState.numbers, to, from);
        newState = {
          number: newNumList,
          moves: prevState.moves + 1
        };
        if (prevState.moves === 0) {
          this.setTimer();
          newState = {
            ...newState,
            gameState: gameState.GAME_STARTED
          };
        }
        if (checkArray(this.state.numbers)) {
          clearInterval(this.timerId);
          newState = {
            ...newState,
            gameState: gameState.GAME_OVER
          };
        }
      }
      return newState;
    });
  };

  changeSize = (tileCount) => {
    this.setState(this.defaultState(NEW_GAME, 1, Math.sqrt(tileCount + 1), tileCount));
  };

  onPauseClick = () => {
    this.setState(prevState => {
      let newGameState = null;

      if (prevState.gameState === gameState.GAME_STARTED) {
        clearInterval(this.timerId);
        newGameState = gameState.GAME_PAUSED;
      } else {
        this.setTimer();
        newGameState = gameState.GAME_STARTED;
      }

      return {
        gameState: newGameState
      };
    });
  };

  render() {
    return (
      <ValuesContext.Provider value={this.state}>
        <SetValueContext.Provider
          value={{
            resetGame: this.reset,
            setTimer: this.setTimer,
            gettingEmptyBoxLocation: this.gettingEmptyBoxLocation,
            moveCell: this.move,
            clickMove: this.clickMove,
            pauseGame: this.onPauseClick,
            changeSize: this.changeSize
          }}
        >
          {this.props.children}
        </SetValueContext.Provider>
      </ValuesContext.Provider>
    );
  }
}

export const GameFactoryConsumer = ({ children }) => {
  return (
    <ValuesContext.Consumer>
      {values => (
        <SetValueContext.Consumer>
          {methods => children({ values, methods })}
        </SetValueContext.Consumer>
      )}
    </ValuesContext.Consumer>
  );
};

export default GameFactory;
