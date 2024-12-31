import React, { PureComponent } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import '@Styles/app.scss';

import { Home } from '@Pages';
import { GameFactory } from '@Elements';

export default class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <GameFactory>
          <div className="app">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </GameFactory>
      </BrowserRouter>
    );
  }
}
