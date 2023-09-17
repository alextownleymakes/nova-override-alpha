import React, { FC } from 'react';
import styled from 'styled-components';
import { StarSystemProps, MiniMapProps } from '../common/interfaces/interfaces';
import constants from '../common/constants/constants';

const MiniMap = styled.div`  
  position: fixed;  
  bottom: 10px;  
  right: 10px;  
  width: 300px;  
  height: 300px;  
  background-color: black;  
  border-radius: 4px;  
  border: 1px solid #666;
  z-index: 500;
`;

const MiniStar = styled.div`  
  position: absolute;  
  width: 2px;  
  height: 2px;  
  background-color: yellow;  
  border-radius: 50%;  
  border: 0.5px solid white;
  z-index: 501;
`;

const MiniStarSystem: FC<StarSystemProps> = ({ system }) => {  

    const { name, x, y } = system;  
  
    const scale = ((constants.miniMap.size ) / (constants.gameMap.size * constants.gameMap.scale));  
  
    return (        
        <MiniStar     
            style={{ left: `${(x*scale)}px`, top: `${(y*scale)}px` }}     
        />        
    );  
}  


const MiniMapComponent: FC<MiniMapProps> = ({ starSystems, onMiniMapClick }) => {  
    const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {  
        const rect = e.currentTarget.getBoundingClientRect();  
        const x = (e.clientX - rect.left);   
        const y = (e.clientY - rect.top);    
        onMiniMapClick(x, y);  
    }  
      
    return (      
        <MiniMap onClick={handleMapClick}>      
            {starSystems.map((system, index) =>      
                <MiniStarSystem key={index} system={system} />      
            )}      
        </MiniMap>      
    );      
}  



export default MiniMapComponent;  
