import { UserButton } from '@clerk/nextjs'
import { Menu, Sparkles } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'

interface NavbarProps {}
const font = Poppins({
  weight: '600',
  subsets: ['latin'],
})

const Navbar: FunctionComponent<NavbarProps> = () => {
  return (
    <header className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary">
      <div className="flex-center">
        <Menu className="block md:hidden"></Menu>
        <Link href="/">
          <h1
            className={cn(
              'hidden md:block text-xl md:tex-3xl font-bold text-primary',
              font.className
            )}>
            AI Chatbots
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button variant="premium">
          Upgrade <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
        </Button>
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}

export default Navbar
