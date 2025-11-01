import { motion } from 'motion/react';
import { Mountain, Waves, Fish as FishIcon } from 'lucide-react';

interface RelationshipGraphProps {
  fishName: string;
  mountainName: string;
  waterName: string;
}

export function RelationshipGraph({ fishName, mountainName, waterName }: RelationshipGraphProps) {
  return (
    <div className="bg-[#1A1A2E]/50 border border-[#16C79A]/30 rounded-lg p-4">
      <p className="text-[#F2F2F2]/80 text-sm mb-4">Territorial Relationships</p>

      <svg viewBox="0 0 200 150" className="w-full h-auto">
        {/* Connection lines */}
        <motion.line
          x1="100" y1="20" x2="50" y2="70"
          stroke="#16C79A"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.line
          x1="100" y1="20" x2="150" y2="70"
          stroke="#16C79A"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.line
          x1="150" y1="70" x2="100" y2="120"
          stroke="#16C79A"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Mountain node */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <circle cx="100" cy="20" r="15" fill="#E4D804" opacity="0.2" />
          <circle cx="100" cy="20" r="12" fill="#1A1A2E" stroke="#E4D804" strokeWidth="2" />
          <foreignObject x="88" y="8" width="24" height="24">
            <Mountain size={16} className="text-[#E4D804]" style={{ margin: '4px' }} />
          </foreignObject>
        </motion.g>

        {/* Water node */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <circle cx="150" cy="70" r="15" fill="#16C79A" opacity="0.2" />
          <circle cx="150" cy="70" r="12" fill="#1A1A2E" stroke="#16C79A" strokeWidth="2" />
          <foreignObject x="138" y="58" width="24" height="24">
            <Waves size={16} className="text-[#16C79A]" style={{ margin: '4px' }} />
          </foreignObject>
        </motion.g>

        {/* Territory node (optional) */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <circle cx="50" cy="70" r="8" fill="#1A1A2E" stroke="#16C79A" strokeWidth="1.5" opacity="0.6" />
        </motion.g>

        {/* Fish node */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <circle cx="100" cy="120" r="15" fill="#E4D804" opacity="0.3" />
          <circle cx="100" cy="120" r="12" fill="#1A1A2E" stroke="#E4D804" strokeWidth="2" />
          <foreignObject x="88" y="108" width="24" height="24">
            <FishIcon size={16} className="text-[#E4D804]" style={{ margin: '4px' }} />
          </foreignObject>
        </motion.g>

        {/* Labels */}
        <text x="100" y="0" textAnchor="middle" className="text-[10px] fill-[#F2F2F2]">
          Mountain
        </text>
        <text x="150" y="100" textAnchor="middle" className="text-[10px] fill-[#F2F2F2]">
          Water
        </text>
        <text x="100" y="145" textAnchor="middle" className="text-[10px] fill-[#E4D804]">
          Fish
        </text>
      </svg>

      {/* Legend */}
      <div className="mt-3 space-y-1 text-xs text-[#F2F2F2]/60">
        <p className="truncate">🏔️ {mountainName}</p>
        <p className="truncate">💧 {waterName}</p>
        <p className="truncate text-[#E4D804]">🐟 {fishName}</p>
      </div>
    </div>
  );
}
