import React, { Component, useState } from 'react';
import { SizeContainer } from '@Elements'
import { SizeSelectorOption } from './SizeSelectorOption';

export const SizeSelector = ({tileCount, onChange}) => {
  return (
    <SizeContainer>
      <SizeSelectorOption number={3} checkedNumber={tileCount} onChange={onChange} />
      <SizeSelectorOption number={8} checkedNumber={tileCount} onChange={onChange} />
      <SizeSelectorOption number={15} checkedNumber={tileCount} onChange={onChange} />
      <SizeSelectorOption number={24} checkedNumber={tileCount} onChange={onChange} />
      <SizeSelectorOption number={35} checkedNumber={tileCount} onChange={onChange} />
      <SizeSelectorOption number={48} checkedNumber={tileCount} onChange={onChange} />
      <SizeSelectorOption number={63} checkedNumber={tileCount} onChange={onChange} />
      <SizeSelectorOption number={80} checkedNumber={tileCount} onChange={onChange} />
      <SizeSelectorOption number={99} checkedNumber={tileCount} onChange={onChange} />
    </SizeContainer>
  );
}