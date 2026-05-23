import { type FC } from 'react'

interface GhostProps {
  className?: string
  variant?: 'classic' | 'glass'
}

export const Ghost: FC<GhostProps> = ({ className = 'w-12 h-12', variant = 'classic' }) => {
  const isGlass = variant === 'glass'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="none"
      className={className}
    >
      {/* Body shadow/creases */}
      <path
        d="M 30,135 C 40,139 50,143 58,145 C 68,142 76,141 82,140 C 90,141 100,141 110,140 C 120,136 135,134 140,132 C 147,133 156,138 162,143 C 160,146 158,149 155,148 C 150,146 142,135 140,132 C 138,135 135,152 130,155 C 125,158 115,152 110,140 C 108,142 105,175 100,180 C 95,185 88,180 88,170 C 88,160 84,142 82,140 C 80,145 78,160 72,162 C 66,164 60,152 58,145 C 56,140 50,152 45,150 C 40,148 30,140 30,135 Z"
        fill={isGlass ? '#ffffff' : '#000000'}
        opacity={isGlass ? '0.04' : '0.15'}
      />

      {/* Outer Body Path */}
      <path
        d="M 62,60 
           C 62,25 138,25 138,60
           C 138,90 170,120 170,140
           C 170,145 160,150 155,148
           C 150,146 142,135 140,132
           C 138,135 135,152 130,155
           C 125,158 115,152 110,140
           C 108,142 105,175 100,180
           C 95,185 88,180 88,170
           C 88,160 84,142 82,140
           C 80,145 78,160 72,162
           C 66,164 60,152 58,145
           C 56,140 50,152 45,150
           C 40,148 30,140 30,135
           C 30,120 62,90 62,60 Z"
        fill={isGlass ? 'rgba(255, 255, 255, 0.08)' : '#ffffff'}
        stroke={isGlass ? 'rgba(255, 255, 255, 0.6)' : '#000000'}
        strokeWidth="4.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Eyes */}
      <ellipse
        cx="87"
        cy="62"
        rx="7"
        ry="14"
        fill={isGlass ? '#ffffff' : '#000000'}
        opacity={isGlass ? '0.9' : '1'}
      />
      <ellipse
        cx="113"
        cy="62"
        rx="7"
        ry="14"
        fill={isGlass ? '#ffffff' : '#000000'}
        opacity={isGlass ? '0.9' : '1'}
      />

      {/* Internal Fold lines */}
      <path
        d="M 112,98 C 112,105 110,125 110,138"
        stroke={isGlass ? 'rgba(255, 255, 255, 0.4)' : '#000000'}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M 75,108 C 76,112 79,122 81,136"
        stroke={isGlass ? 'rgba(255, 255, 255, 0.3)' : '#000000'}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}
