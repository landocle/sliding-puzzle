import React from 'react';
import styled from 'styled-components';
import { color } from '@Utils';

export const SizeSelectorOption = ({number, checkedNumber, onChange}) => {
  const onChangeSize = () => ( onChange(parseInt(number)) );
  return (
  <>
      <RadioButtonLabel htmlFor={number}>
      <RadioButton type="radio" name="size" value={number} id={number} checked={checkedNumber === number} onChange={onChangeSize} />
        {number}
      </RadioButtonLabel>
  </>
  );
}

const RadioButton = styled.input.attrs({
  type: "radio",
})`
  height: 1px;
  width: 1px;
  position: absolute;
  opacity: 0;
`;

const RadioButtonLabel = styled.label`
  cursor: pointer;
  display: inline-block;
  font-size: 2em;
  height: 100%;
  text-align: center;
  width: 50px;

  &:hover {
    background-color: ${color.buttonHoverColor};
    color: ${color.primaryFontColor()};
  }

  &:first-child {
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:has(input[type="radio"]:checked) {
    background-color: ${color.highlightColor};
  }

  @media only screen and (max-width: 520px) {
    font-size: 1.3em;
  }
`;
