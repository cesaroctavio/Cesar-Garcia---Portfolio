import React from 'react'
import { ArrowRight, ChevronRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden relative">
                {/* Linear/Trigger.dev style background rays/glows */}
                <div className="absolute inset-0 z-0 pointer-events-none flex justify-center overflow-hidden">
                    <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen opacity-50"></div>
                </div>
                
                <section className="relative z-10">
                    <div className="relative pt-32 md:pt-48 pb-20">
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mx-auto">
                                <AnimatedGroup variants={transitionVariants}>
                                    <a
                                        href="#experience"
                                        className="hover:bg-white/[0.05] bg-white/[0.02] group mx-auto flex w-fit items-center gap-4 rounded-full border border-white/10 p-1 pl-4 shadow-lg transition-all duration-300 backdrop-blur-md">
                                        <span className="text-white text-sm font-medium">Introducing Automation Excellence</span>
                                        <span className="block h-4 w-0.5 bg-white/20"></span>

                                        <div className="bg-primary/20 group-hover:bg-primary/30 size-6 overflow-hidden rounded-full duration-500 flex items-center justify-center">
                                            <ArrowRight className="size-3 text-primary" />
                                        </div>
                                    </a>
                        
                                    <h1
                                        className="mt-8 max-w-5xl mx-auto text-balance text-6xl md:text-8xl xl:text-[6rem] font-bold tracking-tight text-white">
                                        Modern Solutions for <br/>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Quality Engineering</span>
                                    </h1>
                                    <p
                                        className="mx-auto mt-8 max-w-2xl text-balance text-lg text-zinc-400">
                                        Engineer III specializing in test automation, AI-assisted workflows, and CI/CD integration for global eCommerce platforms.
                                    </p>
                                </AnimatedGroup>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.5,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="rounded-full px-8 text-base bg-white text-black hover:bg-zinc-200">
                                        <a href="#contact">
                                            <span>Start Contact</span>
                                        </a>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="rounded-full px-8 text-base border-white/10 hover:bg-white/5 bg-transparent">
                                        <a href="#experience">
                                            <span>View Experience</span>
                                        </a>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Stack', href: '#skills' },
    { name: 'Contact', href: '#contact' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <header>
            <nav
                data-state={menuState ? 'active' : 'closed'}
                className="fixed z-50 w-full px-4 top-4 group">
                <div className={cn('mx-auto max-w-5xl px-6 transition-all duration-300 rounded-full border border-white/5 backdrop-blur-md bg-black/40', isScrolled && 'border-white/10 bg-black/70 shadow-2xl')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-3">
                        <div className="flex w-full justify-between lg:w-auto">
                            <a
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </a>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-50 -mr-2 block cursor-pointer p-2 lg:hidden text-zinc-400">
                                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-5 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm font-medium">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.href}
                                            className="text-zinc-400 hover:text-white transition-colors duration-150">
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="hidden lg:flex w-fit items-center gap-4">
                            <Button
                                asChild
                                size="sm"
                                className="rounded-full bg-white/10 hover:bg-white/20 text-white border-0">
                                <a href="#contact">
                                    <span>Hire Me</span>
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("text-xl font-bold tracking-tighter text-white flex items-center gap-1", className)}>
            <div className="size-5 rounded bg-primary flex items-center justify-center">
                <div className="size-2 rounded-full bg-black"></div>
            </div>
            CESAR<span className="text-zinc-500">OGS</span>
        </div>
    )
}
