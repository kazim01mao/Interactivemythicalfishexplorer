import { motion, AnimatePresence } from 'motion/react';
import { Mountain as MountainIcon, Waves } from 'lucide-react';
import { Mountain, Water } from '../data/mockData';
import { Button } from './ui/button';

interface InteractiveMapProps {
  mountains: Mountain[];
  waters: Water[];
  selectedMountain: Mountain | null;
  onMountainClick: (mountain: Mountain) => void;
  onWaterClick: (water: Water) => void;
  onReset: () => void;
}

export function InteractiveMap({
  mountains,
  waters,
  selectedMountain,
  onMountainClick,
  onWaterClick,
  onReset
}: InteractiveMapProps) {
  const connectedWaters = selectedMountain 
    ? waters.filter(w => selectedMountain.waters.includes(w.id))
    : [];

  // Handle clicking on empty space to deselect
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only reset if clicking directly on the background, not on children
    if (e.target === e.currentTarget) {
      onReset();
    }
  };

  // Generate flowing curved path for water connections
  const generateFlowingPath = (x1: number, y1: number, x2: number, y2: number, index: number) => {
    // Calculate control points for a smooth curve
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    
    // Add some variation based on index for different curve shapes
    const offsetVariation = index % 2 === 0 ? 1 : -1;
    const curvature = 5 + (index * 2); // Varying curvature
    
    // Calculate perpendicular offset for the control point
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const offsetX = (-dy / dist) * curvature * offsetVariation;
    const offsetY = (dx / dist) * curvature * offsetVariation;
    
    // Create a quadratic bezier curve
    return `M ${x1} ${y1} Q ${midX + offsetX} ${midY + offsetY} ${x2} ${y2}`;
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1733218526152-91e19994578f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY2hpbmVzZSUyMG1vdW50YWluJTIwaW5rfGVufDF8fHx8MTc2MTgyODg1Mnww&ixlib=rb-4.1.0&q=80&w=1080)'
        }}
      />

      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-[#E4D804] mb-2">Shanhaijing Bestiary</h1>
        <p className="text-[#F2F2F2] opacity-80">Classic of Mountains and Seas</p>
      </div>

      {/* Reset button */}
      <AnimatePresence>
        {selectedMountain && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-8 right-8 z-10"
          >
            <Button
              onClick={onReset}
              variant="outline"
              className="bg-[#1A1A2E]/80 border-[#E4D804] text-[#E4D804] hover:bg-[#E4D804] hover:text-[#1A1A2E]"
            >
              Reset View
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map container */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        onClick={handleBackgroundClick}
      >
        <div className="relative w-[80vw] h-[70vh]">
          {/* Mountains */}
          {mountains.map((mountain) => {
            const isSelected = selectedMountain?.id === mountain.id;
            const isFaded = selectedMountain && !isSelected;

            return (
              <motion.div
                key={mountain.id}
                className="absolute group cursor-pointer"
                style={{
                  left: `${mountain.x}%`,
                  top: `${mountain.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  opacity: isFaded ? 0.3 : 1,
                  scale: isSelected ? 1.2 : 1
                }}
                whileHover={{ scale: isSelected ? 1.2 : 1.15 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onMountainClick(mountain);
                }}
              >
                {/* Mountain icon */}
                <motion.div
                  className={`relative ${isSelected ? 'text-[#E4D804]' : 'text-[#16C79A]'}`}
                  animate={{
                    filter: isSelected 
                      ? 'drop-shadow(0 0 20px rgba(228, 216, 4, 0.8))'
                      : 'drop-shadow(0 0 10px rgba(22, 199, 154, 0.5))'
                  }}
                >
                  <MountainIcon size={isSelected ? 48 : 36} />
                  {/* Pulsing ring effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-full ${isSelected ? 'bg-[#E4D804]' : 'bg-[#16C79A]'}`}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </motion.div>

                {/* Tooltip */}
                <motion.div
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1A1A2E]/90 px-3 py-2 rounded-md border border-[#16C79A] pointer-events-none"
                  initial={{ opacity: 0, y: -10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  style={{ opacity: 0 }}
                >
                  <p className="text-[#F2F2F2] text-sm">{mountain.name}</p>
                  <p className="text-[#16C79A] text-xs">{mountain.nameZh}</p>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Connected Waters */}
          <AnimatePresence>
            {connectedWaters.map((water, index) => {
              const mountain = selectedMountain!;
              // Calculate water position (slightly offset from mountain)
              const angle = (index * (360 / connectedWaters.length)) * (Math.PI / 180);
              const distance = 15; // Distance in percentage
              const waterX = mountain.x + Math.cos(angle) * distance;
              const waterY = mountain.y + Math.sin(angle) * distance;

              return (
                <motion.g key={water.id}>
                  {/* Connection line */}
                  <motion.svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d={generateFlowingPath(mountain.x, mountain.y, waterX, waterY, index)}
                      stroke="#16C79A"
                      strokeWidth="0.3"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeInOut" }}
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(22, 199, 154, 0.6))',
                        vectorEffect: 'non-scaling-stroke'
                      }}
                    />
                    {/* Animated flowing particles along the path */}
                    <motion.circle
                      r="0.5"
                      fill="#16C79A"
                      opacity="0.8"
                      style={{
                        offsetPath: `path('${generateFlowingPath(mountain.x, mountain.y, waterX, waterY, index)}')`,
                        offsetDistance: '0%'
                      }}
                      animate={{
                        offsetDistance: ['0%', '100%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.3
                      }}
                    />
                  </motion.svg>

                  {/* Water node */}
                  <motion.div
                    className="absolute cursor-pointer group/water"
                    style={{
                      left: `${waterX}%`,
                      top: `${waterY}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onWaterClick(water);
                    }}
                  >
                    <motion.div
                      className="text-[#16C79A]"
                      animate={{
                        filter: 'drop-shadow(0 0 15px rgba(22, 199, 154, 0.7))'
                      }}
                    >
                      <Waves size={32} />
                      {/* Ripple effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#16C79A]"
                        animate={{
                          scale: [1, 2, 1],
                          opacity: [0.3, 0, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.2
                        }}
                      />
                    </motion.div>

                    {/* Water tooltip */}
                    <motion.div
                      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1A1A2E]/90 px-3 py-2 rounded-md border border-[#16C79A] pointer-events-none opacity-0 group-hover/water:opacity-100 transition-opacity"
                    >
                      <p className="text-[#F2F2F2] text-sm">{water.name}</p>
                      <p className="text-[#16C79A] text-xs">{water.nameZh}</p>
                      <p className="text-[#F2F2F2]/60 text-xs capitalize">{water.type}</p>
                    </motion.div>
                  </motion.div>
                </motion.g>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}