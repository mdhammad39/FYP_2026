import React, { useState, useEffect } from 'react'
import dawoodLogo from '../assets/dawood_logo.png'
import resolveLogo from '../assets/resolve_logo.png'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            // Update active section based on scroll position
            const sections = ['about', 'methodology', 'yield-map', 'results', 'team']
            // Use slice() to create a copy before reversing to avoid mutating the original array
            for (const section of sections.slice().reverse()) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 150) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <a href="#home" className="navbar-brand">
                    <div className="logo-icon">🌾</div>
                    <span>CAPWYP</span>
                </a>

                <div className="navbar-logos">
                    <img src={dawoodLogo} alt="Dawood University" className="nav-logo" />
                    <img src={resolveLogo} alt="RESOLVE" className="nav-logo" />
                </div>

                <ul className="nav-links">
                    <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
                    <li><a href="#methodology" className={activeSection === 'methodology' ? 'active' : ''}>Methodology</a></li>
                    <li><a href="#yield-map" className={activeSection === 'yield-map' ? 'active' : ''}>District</a></li>
                    <li><a href="#results" className={activeSection === 'results' ? 'active' : ''}>Results</a></li>
                    <li><a href="#team" className={activeSection === 'team' ? 'active' : ''}>Team</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
