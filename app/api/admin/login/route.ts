import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for login
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

// Admin credentials (in production, use environment variables and hashed passwords)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123',
}

const SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN || 'admin-secret-token'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = loginSchema.parse(body)
    
    // Check credentials
    console.log('Login attempt:', { username: validatedData.username, expectedUsername: ADMIN_CREDENTIALS.username })
    
    if (
      validatedData.username === ADMIN_CREDENTIALS.username &&
      validatedData.password === ADMIN_CREDENTIALS.password
    ) {
      console.log('Login successful, setting session cookie')
      
      // Create response with success
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
      })
      
      // Set secure HTTP-only cookie for session
      response.cookies.set('admin-session', SESSION_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
      
      console.log('Session cookie set with token:', SESSION_TOKEN)
      return response
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid username or password' 
        },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Admin login error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Login failed. Please try again.' 
      },
      { status: 500 }
    )
  }
} 