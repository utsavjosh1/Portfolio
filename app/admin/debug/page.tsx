import { cookies } from 'next/headers'

export default async function AdminDebugPage() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin-session')
  const expectedToken = process.env.ADMIN_SESSION_TOKEN || 'admin-secret-token'

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Debug Page</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Session Cookie</h2>
          <p><strong>Exists:</strong> {adminSession ? 'Yes' : 'No'}</p>
          <p><strong>Value:</strong> {adminSession?.value || 'None'}</p>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Expected Token</h2>
          <p><strong>Token:</strong> {expectedToken}</p>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Authentication Status</h2>
          <p><strong>Valid:</strong> {adminSession?.value === expectedToken ? 'Yes' : 'No'}</p>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Environment</h2>
          <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
          <p><strong>Admin Username:</strong> {process.env.ADMIN_USERNAME}</p>
        </div>
      </div>
    </div>
  )
} 