import { useState } from 'react';
import { InteractiveMap } from './components/InteractiveMap';
import { FishSelectionPanel } from './components/FishSelectionPanel';
import { FishDetailPage } from './components/FishDetailPage';
import { mountains, waters, fish, Mountain, Water, Fish } from './data/mockData';

type AppState = 
  | { screen: 'map'; selectedMountain: Mountain | null; selectedWater: Water | null }
  | { screen: 'detail'; selectedFish: Fish; mountainName: string; waterName: string };

export default function App() {
  const [state, setState] = useState<AppState>({
    screen: 'map',
    selectedMountain: null,
    selectedWater: null
  });

  const handleMountainClick = (mountain: Mountain) => {
    if (state.screen === 'map') {
      setState({
        screen: 'map',
        selectedMountain: mountain,
        selectedWater: null
      });
    }
  };

  const handleWaterClick = (water: Water) => {
    if (state.screen === 'map') {
      setState({
        screen: 'map',
        selectedMountain: state.selectedMountain,
        selectedWater: water
      });
    }
  };

  const handleFishSelect = (selectedFish: Fish) => {
    if (state.screen === 'map' && state.selectedWater) {
      const water = state.selectedWater;
      const mountain = mountains.find(m => m.id === water.mountainId);
      
      setState({
        screen: 'detail',
        selectedFish,
        mountainName: mountain?.name || '',
        waterName: water.name
      });
    }
  };

  const handleReset = () => {
    setState({
      screen: 'map',
      selectedMountain: null,
      selectedWater: null
    });
  };

  const handleBack = () => {
    setState({
      screen: 'map',
      selectedMountain: null,
      selectedWater: null
    });
  };

  const handleClosePanel = () => {
    if (state.screen === 'map') {
      setState({
        ...state,
        selectedWater: null
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] dark">
      {state.screen === 'map' ? (
        <>
          <InteractiveMap
            mountains={mountains}
            waters={waters}
            selectedMountain={state.selectedMountain}
            onMountainClick={handleMountainClick}
            onWaterClick={handleWaterClick}
            onReset={handleReset}
          />
          <FishSelectionPanel
            water={state.selectedWater}
            fish={fish}
            onFishSelect={handleFishSelect}
            onClose={handleClosePanel}
          />
        </>
      ) : (
        <FishDetailPage
          fish={state.selectedFish}
          mountainName={state.mountainName}
          waterName={state.waterName}
          onBack={handleBack}
        />
      )}
    </div>
  );
}