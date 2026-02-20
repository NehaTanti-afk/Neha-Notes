import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 36,
          background: '#6B3A1D',
        }}
      >
        <span
          style={{
            fontSize: 120,
            fontWeight: 800,
            color: '#F0DCC8',
            lineHeight: 1,
            marginTop: -4,
          }}
        >
          N
        </span>
      </div>
    ),
    { ...size },
  )
}
