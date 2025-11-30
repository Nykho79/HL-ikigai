import React from 'react';
import { IkigaiState } from '../types';

interface VennDiagramProps {
  data: IkigaiState;
  simple?: boolean;
}

export const VennDiagram: React.FC<VennDiagramProps> = ({ data, simple = false }) => {
  // SVG coordinates and sizes
  const width = 600;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 160;
  const offset = 90;

  // Circle Centers
  const topCenter = { x: centerX, y: centerY - offset };
  const rightCenter = { x: centerX + offset, y: centerY };
  const bottomCenter = { x: centerX, y: centerY + offset };
  const leftCenter = { x: centerX - offset, y: centerY };

  const CircleGroup = ({ 
    x, y, color, label, items, className 
  }: { x: number, y: number, color: string, label: string, items: string[], className?: string }) => (
    <g className={className}>
      <circle 
        cx={x} 
        cy={y} 
        r={radius} 
        fill={color} 
        className="mix-blend-multiply opacity-80"
      />
      {!simple && (
        <foreignObject x={x - 100} y={y - 80} width="200" height="160" className="pointer-events-none">
           <div className="h-full w-full flex flex-col items-center justify-center text-center p-2 overflow-hidden">
             {items.slice(0, 3).map((item, i) => (
               <span key={i} className="text-xs text-gray-800 font-medium truncate w-full block bg-white/30 rounded px-1 mb-1 shadow-sm backdrop-blur-sm">
                 {item}
               </span>
             ))}
             {items.length > 3 && <span className="text-xs text-gray-600">+{items.length - 3} autres</span>}
           </div>
        </foreignObject>
      )}
    </g>
  );

  const Label = ({ x, y, text }: { x: number, y: number, text: string }) => (
    <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-sm md:text-base font-bold uppercase tracking-widest fill-gray-700" style={{ textShadow: '0px 0px 4px rgba(255,255,255,0.8)' }}>
      {text}
    </text>
  );

  return (
    <div className="w-full aspect-square max-w-[500px] mx-auto relative select-none">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full drop-shadow-xl">
        <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>

        {/* Circles */}
        <CircleGroup x={topCenter.x} y={topCenter.y} color="#ffadad" label="AIME" items={data.love} />
        <CircleGroup x={rightCenter.x} y={rightCenter.y} color="#caffbf" label="BESOIN" items={data.needs} />
        <CircleGroup x={bottomCenter.x} y={bottomCenter.y} color="#fdffb6" label="PAYÉ" items={data.paid} />
        <CircleGroup x={leftCenter.x} y={leftCenter.y} color="#ffd6a5" label="DOUÉ" items={data.goodAt} />

        {/* Main Section Labels */}
        <Label x={topCenter.x} y={topCenter.y - radius - 20} text="CE QUE J'AIME" />
        <Label x={rightCenter.x + radius + 20} y={rightCenter.y} text="BESOINS" />
        <Label x={bottomCenter.x} y={bottomCenter.y + radius + 30} text="PAYÉ" />
        <Label x={leftCenter.x - radius - 20} y={leftCenter.y} text="TALENTS" />

        {/* Intersection Labels (Passion, Mission, etc) */}
        {!simple && (
            <>
                <text x={centerX + 90} y={centerY - 90} textAnchor="middle" className="text-xs font-bold fill-gray-600 rotate-45">MISSION</text>
                <text x={centerX + 90} y={centerY + 100} textAnchor="middle" className="text-xs font-bold fill-gray-600 -rotate-45">VOCATION</text>
                <text x={centerX - 90} y={centerY + 100} textAnchor="middle" className="text-xs font-bold fill-gray-600 rotate-45">PROFESSION</text>
                <text x={centerX - 90} y={centerY - 90} textAnchor="middle" className="text-xs font-bold fill-gray-600 -rotate-45">PASSION</text>
            </>
        )}

        {/* Center Ikigai */}
        <circle cx={centerX} cy={centerY} r={50} fill="white" className="drop-shadow-md" />
        <text x={centerX} y={centerY} textAnchor="middle" dominantBaseline="middle" className="text-xl md:text-2xl font-bold fill-indigo-600" filter="url(#glow)">
          IKIGAI
        </text>
      </svg>
    </div>
  );
};