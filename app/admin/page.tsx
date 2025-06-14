import { redirect } from 'next/navigation'

export default function AdminDashboard() {
  // Redirect to contact submissions as the default admin page
  redirect('/admin/contact')
} 