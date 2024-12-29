import { css } from 'styled-components';

export const setupColumns = (gridWidth) => {
  let styles = '';
  for (let i = 0; i < gridWidth; i++)
    styles += 'auto ';

  return css`${styles}`;
}