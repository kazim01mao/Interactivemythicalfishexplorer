import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, MapPin, Scroll } from 'lucide-react';
import { Fish, FishImage } from '../data/mockData';
import { Timeline } from './Timeline';
import { RelationshipGraph } from './RelationshipGraph';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FishDetailPageProps {
  fish: Fish;
  mountainName: string;
  waterName: string;
  onBack: () => void;
}

export function FishDetailPage({ fish, mountainName, waterName, onBack }: FishDetailPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<FishImage['period']>('ancient');
  
  const currentImage = fish.images.find(img => img.period === selectedPeriod) || fish.images[0];

  // Image URLs based on period
  const getImageUrl = (period: FishImage['period']) => {
    switch (period) {
      case 'ancient':
        return 'https://images.unsplash.com/photo-1719773906940-5b0cf605b1cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwd29vZGN1dCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjE4Mjg4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080';
      case 'modern1':
        return 'https://images.unsplash.com/photo-1761079926188-7989a3c315d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXRoaWNhbCUyMGZpc2glMjBjcmVhdHVyZXxlbnwxfHx8fDE3NjE4Mjg4NTR8MA&ixlib=rb-4.1.0&q=80&w=1080';
      case 'modern2':
        return 'https://images.unsplash.com/photo-1693595526583-cd6ef289ece7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb2klMjBjYXJwJTIwYXJ0aXN0aWN8ZW58MXx8fHwxNzYxODI4ODU1fDA&ixlib=rb-4.1.0&q=80&w=1080';
      case 'modern3':
        return 'https://images.unsplash.com/photo-1761079926188-7989a3c315d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXRoaWNhbCUyMGZpc2glMjBjcmVhdHVyZXxlbnwxfHx8fDE3NjE4Mjg4NTR8MA&ixlib=rb-4.1.0&q=80&w=1080';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1733218526152-91e19994578f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY2hpbmVzZSUyMG1vdW50YWluJTIwaW5rfGVufDF8fHx8MTc2MTgyODg1Mnww&ixlib=rb-4.1.0&q=80&w=1080)'
        }}
      />

      {/* Header */}
      <div className="relative border-b border-[#16C79A]/30 px-8 py-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-[#F2F2F2] hover:text-[#E4D804] hover:bg-[#E4D804]/10"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Map
        </Button>
      </div>

      {/* Main content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-[70%_30%] gap-0 min-h-[calc(100vh-90px)]">
        {/* Left column - Visual Experience */}
        <div className="border-r border-[#16C79A]/30 p-8">
          {/* Fish name header */}
          <div className="mb-6">
            <h1 className="text-[#E4D804] mb-2">{fish.name}</h1>
            <p className="text-[#16C79A] text-xl">{fish.nameZh}</p>
          </div>

          {/* Main image display */}
          <div className="relative mb-8">
            <motion.div
              className="relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-[#16C79A]/30 bg-[#1A1A2E]/50"
              layoutId={`fish-image-${selectedPeriod}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPeriod}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={getImageUrl(selectedPeriod)}
                    alt={`${fish.name} - ${currentImage.label}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/60 via-transparent to-transparent" />
                  
                  {/* Image label */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="bg-[#1A1A2E]/80 backdrop-blur-sm px-4 py-2 rounded border border-[#E4D804]/50"
                    >
                      <p className="text-[#E4D804]">{currentImage.label}</p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Interactive Timeline */}
          <Timeline
            images={fish.images}
            selectedPeriod={selectedPeriod}
            onPeriodSelect={setSelectedPeriod}
          />

          {/* AI Style Analysis */}
          <div className="mt-8">
            <div className="bg-[#1A1A2E]/50 border border-[#E4D804]/30 rounded-lg p-6 bg-[rgba(249,249,255,0.5)]">
              <div className="flex items-center gap-2 mb-4">
                <Scroll className="text-[#E4D804]" size={20} />
                <h3 className="text-[#E4D804]">AI-Generated Style Analysis</h3>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedPeriod}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-white leading-relaxed"
                >
                  {currentImage.styleAnalysis}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right column - Information */}
        <div className="bg-[#1A1A2E]/30">
          <ScrollArea className="h-[calc(100vh-90px)]">
            <div className="p-8 space-y-6">
              {/* Source information */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="text-[#16C79A] flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-[#F2F2F2]/60 text-sm mb-1">Source Book</p>
                    <p className="text-[#F2F2F2]">{fish.sourceBook}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Scroll className="text-[#16C79A] flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-[#F2F2F2]/60 text-sm mb-1">Chapter</p>
                    <p className="text-[#F2F2F2]">{fish.sourceChapter}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="text-[#16C79A] flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-[#F2F2F2]/60 text-sm mb-1">Territory</p>
                    <p className="text-[#F2F2F2]">{fish.territory}</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#16C79A]/30" />

              {/* Description */}
              <div>
                <p className="text-[#F2F2F2]/60 text-sm mb-2">Description</p>
                <p className="text-[#F2F2F2] leading-relaxed">{fish.description}</p>
              </div>

              {/* Original text */}
              <div>
                <p className="text-[#F2F2F2]/60 text-sm mb-2">Original Text</p>
                <div className="bg-[#1A1A2E]/50 border border-[#16C79A]/30 rounded-lg p-4">
                  <p className="text-[#16C79A] leading-loose" style={{ fontFamily: 'serif' }}>
                    {fish.originalText}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#16C79A]/30" />

              {/* Relationship graph */}
              <RelationshipGraph
                fishName={fish.name}
                mountainName={mountainName}
                waterName={waterName}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
