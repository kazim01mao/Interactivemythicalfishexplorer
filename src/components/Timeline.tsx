import { motion } from 'motion/react';
import { FishImage } from '../data/mockData';
import { Sparkles } from 'lucide-react';

interface TimelineProps {
  images: FishImage[];
  selectedPeriod: FishImage['period'];
  onPeriodSelect: (period: FishImage['period']) => void;
}

export function Timeline({ images, selectedPeriod, onPeriodSelect }: TimelineProps) {
  return (
    <div className="relative py-8">
      {/* Timeline title */}
      <p className="text-[#F2F2F2]/80 text-sm mb-6 text-center">
        Visual Evolution Timeline
      </p>

      {/* Timeline container */}
      <div className="relative px-8">
        {/* Line */}
        <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-[#16C79A]/30" />

        {/* Active line segment */}
        <motion.div
          className="absolute top-1/2 left-8 h-[2px] bg-[#E4D804]"
          initial={false}
          animate={{
            width: `${(images.findIndex(img => img.period === selectedPeriod) / (images.length - 1)) * 100}%`
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        />

        {/* Nodes */}
        <div className="relative flex justify-between">
          {images.map((image, index) => {
            const isSelected = image.period === selectedPeriod;
            const isAncient = image.period === 'ancient';

            return (
              <div key={image.period} className="flex flex-col items-center">
                {/* Node button */}
                <motion.button
                  onClick={() => onPeriodSelect(image.period)}
                  className="relative z-10 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Outer ring */}
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isSelected 
                        ? 'bg-[#E4D804] shadow-lg shadow-[#E4D804]/50' 
                        : 'bg-[#1A1A2E] border-2 border-[#16C79A]/50 hover:border-[#16C79A]'
                    } transition-colors`}
                    animate={isSelected ? {
                      boxShadow: [
                        '0 0 20px rgba(228, 216, 4, 0.5)',
                        '0 0 30px rgba(228, 216, 4, 0.8)',
                        '0 0 20px rgba(228, 216, 4, 0.5)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {/* Inner circle or icon */}
                    {isAncient ? (
                      <Sparkles 
                        size={24} 
                        className={isSelected ? 'text-[#1A1A2E]' : 'text-[#E4D804]'}
                      />
                    ) : (
                      <motion.div
                        className={`w-8 h-8 rounded-full ${
                          isSelected ? 'bg-[#1A1A2E]' : 'bg-[#16C79A]/30'
                        }`}
                      />
                    )}
                  </motion.div>

                  {/* Ripple effect */}
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#E4D804]"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.button>

                {/* Label */}
                <motion.div
                  className="mt-4 text-center"
                  animate={{
                    opacity: isSelected ? 1 : 0.6,
                    y: isSelected ? 0 : 5
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <p className={`text-sm ${isSelected ? 'text-[#E4D804]' : 'text-[#F2F2F2]'}`}>
                    {image.label}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
