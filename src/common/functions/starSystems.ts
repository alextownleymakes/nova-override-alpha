import constants from "../constants/constants";
import { StarSystemType } from "../interfaces/interfaces";

// Inside your functions/starSystems.ts file
function generateStarSystems(numSystems: number, centerX: number, centerY: number, ): StarSystemType[] {
    const systems: StarSystemType[] = [];
    const scale = constants.gameMap.scale;

    for (let i = 0; i < numSystems; i++) {
        let x = 0, y = 0;
        let distance = 0;

        do {
            const angle = Math.random() * 2 * Math.PI;
            const maxDistance = (Math.pow(Math.random(), 2) * (constants.gameMap.size / 2)) * scale;
            
            x = centerX + Math.round(maxDistance * Math.cos(angle));
            y = centerY + Math.round(maxDistance * Math.sin(angle));
            
            distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) / scale;
        } while (
            systems.some(system => {
                // Calculate the minimum distance based on the current scale
                const minDistance = constants.gameMap.minDistance * scale;
                
                return (
                    Math.abs(system.x - x) < minDistance &&
                    Math.abs(system.y - y) < minDistance
                );
            })
        );

        systems.push({
            name: `System ${i}`,
            x: x,
            y: y
        });
    }

    return systems;
}


export const starSystems = {
    generate: generateStarSystems
}
