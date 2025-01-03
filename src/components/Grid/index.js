import React, { Component } from 'react';
import {
  GridContainer,
  GameFactoryConsumer,
  GridOverlay,
  Icon
} from '@Elements';
import { color, gameState } from '@Utils';

import Cell from '../Cell';

export default class Grid extends Component {
  cellRender(number = [], tileCount, clickMove) {
    return number.map((i, _) => (
      <Cell key={_} number={i} index={_} clickMove={clickMove} tileCount={tileCount} />
    ));
  }
  render() {
    return (
      <GameFactoryConsumer>
        {({ values, methods }) => (
          <GridContainer gridwidth={values.gridWidth}>
            {this.cellRender(values.numbers, values.tileCount, methods.clickMove)}
            {values.gameState === gameState.GAME_PAUSED && (
              <GridOverlay>
                <div onClick={methods.pauseGame}>
                  <Icon
                    name="play"
                    color={color.modalBackgroundColor}
                    size={80}
                    style={{
                      cursor: 'pointer'
                    }}
                  />
                </div>
              </GridOverlay>
            )}
          </GridContainer>
        )}
      </GameFactoryConsumer>
    );
  }
}
