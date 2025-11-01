import { motion, AnimatePresence } from 'motion/react';
import { Fish as FishIcon, X } from 'lucide-react';
import { Fish, Water } from '../data/mockData';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface FishSelectionPanelProps {
  water: Water | null;
  fish: Fish[];
  onFishSelect: (fish: Fish) => void;
  onClose: () => void;
}

export function FishSelectionPanel({
  water,
  fish,
  onFishSelect,
  onClose
}: FishSelectionPanelProps) {
  if (!water) return null;

  const waterFish = fish.filter(f => water.fish.includes(f.id));

  return (
    <AnimatePresence>
      {water && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-[#1A1A2E] border-l-2 border-[#E4D804] z-50 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-[#16C79A]/30">
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-[#F2F2F2] hover:text-[#E4D804] hover:bg-[#E4D804]/10"
              >
                <X size={24} />
              </Button>

              <div className="pr-12">
                <h2 className="text-[#E4D804] mb-2">
                  {water.name}
                </h2>
                <p className="text-[#16C79A]">
                  {water.nameZh}
                </p>
                <p className="text-[#F2F2F2]/60 text-sm mt-1 capitalize text-[rgb(255,249,249)]">
                  {water.type}
                </p>
              </div>
            </div>

            {/* Fish list */}
            <ScrollArea className="h-[calc(100vh-140px)]">
              <div className="p-6 space-y-4">
                <p className="text-[#F2F2F2]/80 text-sm mb-6 text-[rgb(255,250,250)]">
                  Select a mythical creature to explore:
                </p>

                {waterFish.map((fishItem, index) => (
                  <motion.div
                    key={fishItem.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => onFishSelect(fishItem)}
                      className="w-full p-4 rounded-lg border border-[#16C79A]/30 bg-[#1A1A2E]/50 hover:bg-[#16C79A]/10 hover:border-[#16C79A] transition-all group text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <motion.div
                            className="text-[#16C79A] group-hover:text-[#E4D804] transition-colors"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                          >
                            <FishIcon size={32} />
                          </motion.div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-[#F2F2F2] group-hover:text-[#E4D804] transition-colors mb-1">
                            {fishItem.name}
                          </h3>
                          <p className="text-[#16C79A] text-sm mb-2">
                            {fishItem.nameZh}
                          </p>
                          <p className="text-[#F2F2F2]/60 text-sm line-clamp-2 text-[rgb(255,251,251)]">
                            {fishItem.description}
                          </p>
                        </div>

                        <motion.div
                          className="flex-shrink-0 text-[#E4D804] opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          →
                        </motion.div>
                      </div>
                    </button>
                  </motion.div>
                ))}

                {waterFish.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-[#F2F2F2]/60">
                      No fish found in these waters
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
