import './globals.css'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from "./context/authContext";
import Navbar from './navbar';
import Footer from './footer/page';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Store',
  description: 'Store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
            <AuthContextProvider>
      <body className={inter.className}><Navbar/>{children}
      <Footer/>
      </body>
        </AuthContextProvider>
    </html>
  )
}