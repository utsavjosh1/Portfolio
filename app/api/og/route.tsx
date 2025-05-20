import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/config/site';

export const runtime = 'edge';

export async function GET() {
  const response = new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
          width: '100%',
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '60px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            Utsav Joshi
          </h1>
          <h2
            style={{
              fontSize: '40px',
              color: '#a0a0a0',
              marginBottom: '40px',
            }}
          >
            Full Stack Developer & Software Engineer
          </h2>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                padding: '10px 20px',
                backgroundColor: '#ffffff20',
                borderRadius: '8px',
                color: '#ffffff',
              }}
            >
              React
            </div>
            <div
              style={{
                padding: '10px 20px',
                backgroundColor: '#ffffff20',
                borderRadius: '8px',
                color: '#ffffff',
              }}
            >
              Next.js
            </div>
            <div
              style={{
                padding: '10px 20px',
                backgroundColor: '#ffffff20',
                borderRadius: '8px',
                color: '#ffffff',
              }}
            >
              TypeScript
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    }
  );
  
  return response;
}
