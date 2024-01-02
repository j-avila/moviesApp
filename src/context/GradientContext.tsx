import { Dispatch, createContext, useState } from 'react';

interface ImageColors {
  primary: string;
  secondary: string;
}

interface ContextProps {
  colors: ImageColors;
  prevColors: ImageColors;
  setPrevColors: Dispatch<React.SetStateAction<ImageColors>>;
  setColors: Dispatch<React.SetStateAction<ImageColors>>;
}

const initialState = {
  primary: 'tomato',
  secondary: 'black',
};

export const GradientContext = createContext({} as ContextProps);

export const GradientProvider = ({ children }: any) => {
  const [prevColors, setPrevColors] = useState<ImageColors>(initialState);
  const [colors, setColors] = useState<ImageColors>(initialState);

  return (
    <GradientContext.Provider
      value={{
        colors,
        prevColors,
        setColors,
        setPrevColors,
      }}
    >
      {children}
    </GradientContext.Provider>
  );
};
