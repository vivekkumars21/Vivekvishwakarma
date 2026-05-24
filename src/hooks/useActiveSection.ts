import { useState, useEffect, useRef } from 'react'

/**
 * A custom React hook to track the active section in the viewport,
 * providing clean URL state-driven navigation highlighting without exposing
 * hash anchors in the browser address bar.
 * 
 * @param sectionIds List of HTML element IDs that represent scroll sections.
 * @param offset Vertical offset from the top of the screen to trigger section change.
 */
export const useActiveSection = (sectionIds: string[], offset = 120): readonly [string, (sectionId: string) => void] => {
  const [activeSection, setActiveSection] = useState<string>('')
  const isClickedRef = useRef<boolean>(false)
  const clickTimeoutRef = useRef<number | null>(null)

  // Function to manually set active section (e.g. on click) and lock updates briefly
  const handleNavClick = (sectionId: string) => {
    isClickedRef.current = true
    setActiveSection(sectionId)

    if (clickTimeoutRef.current) {
      window.clearTimeout(clickTimeoutRef.current)
    }

    // Unlock scroll updates after smooth scroll completes (~850ms)
    clickTimeoutRef.current = window.setTimeout(() => {
      isClickedRef.current = false
    }, 850)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isClickedRef.current) return

      let currentActive = ''
      const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop

      // Special case: If we are close to the top of the page, force active section to the first one (usually 'home')
      if (scrollPosition < 50) {
        currentActive = sectionIds[0]
      } else {
        // Find which section's top is closest to the offset threshold
        for (const id of sectionIds) {
          const el = document.getElementById(id)
          if (!el) continue

          const rect = el.getBoundingClientRect()
          // Check if the element occupies the top area of the viewport
          if (rect.top <= offset && rect.bottom > offset) {
            currentActive = id
            break
          }
        }
      }

      // If we didn't find any section matching, fallback to check which is closest
      if (!currentActive) {
        let minDiff = Infinity
        for (const id of sectionIds) {
          const el = document.getElementById(id)
          if (!el) continue

          const rect = el.getBoundingClientRect()
          const diff = Math.abs(rect.top - offset)
          if (diff < minDiff) {
            minDiff = diff
            currentActive = id
          }
        }
      }

      if (currentActive && currentActive !== activeSection) {
        setActiveSection(currentActive)
      }
    }

    // Register captured scroll event to ensure support for diverse scrollable containers
    window.addEventListener('scroll', handleScroll, true)
    
    // Run once on load to establish active section
    handleScroll()

    return () => {
      window.addEventListener('scroll', handleScroll, true)
      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current)
      }
    }
  }, [sectionIds, activeSection, offset])

  // Support legacy hash deep-links: scroll to target, then instantly cleanse URL back to pure path!
  useEffect(() => {
    const initialHash = window.location.hash.replace('#', '')
    if (initialHash && sectionIds.includes(initialHash)) {
      // Delay slightly to ensure component layout and elements are fully rendered
      const timer = setTimeout(() => {
        const el = document.getElementById(initialHash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          setActiveSection(initialHash)
          // Clean the address bar by removing the hash dynamically for a premium clean URL
          window.history.replaceState(null, '', window.location.pathname + window.location.search)
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [])

  // Expose both the active section and the navigation click handler globally
  useEffect(() => {
    (window as any).__handleNavClick = handleNavClick
    return () => {
      delete (window as any).__handleNavClick
    }
  }, [activeSection])

  return [activeSection, handleNavClick] as const
}
