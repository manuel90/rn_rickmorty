import * as React from "react"

import { render, screen } from '@testing-library/react-native'
import { Stack } from "expo-router"

//Components
import ThemedText from "@/components/ThemedText"
import RoundedImage from "@/components/RoundedImage"


//Context
import AppContext from "@/contexts";


describe('basic components render', () => {


  const contextApp = {
    textSearch: '',
    setTextSearch: (val: string) => {},
    
    filterCharacters: 'all',
    setFilterCharacters: (val: string) => {},
    
    filterSpecie: 'all',
    setFilterSpecie: (val: string) => {},
    isFavorite: (characterId: number) => false,
    addFavorite: (characerId: number) => {},
    removeFavorite: (characerId: number) => {},
  }

  
  it(`ThemedText renders correctly`, () => {
  
    render(<ThemedText>Snapshot test!</ThemedText>);
    
    expect(screen.getByTestId('textElement')).toBeTruthy();
  
    
  });
  
  it(`RoundedImage renders correctly`, () => {
  
    render(<RoundedImage height="100" width="100" source={require('./assets/icon.png')} />);
    
    expect(screen.getByTestId('imageCircle')).toBeTruthy();
  
    
  });
})
