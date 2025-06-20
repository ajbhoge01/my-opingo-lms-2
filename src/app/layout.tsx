import "./globals.css"
import Navbar from "../components/navbar"
import type { ReactNode } from "react"

export const metadata = {
  title: "Apna LMS - Complete Learning Management System",
  description: "Comprehensive LMS with AI features, live classes, assessments, and more",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
