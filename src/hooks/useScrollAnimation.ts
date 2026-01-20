import { useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * Uses Intersection Observer API for performance
 * 
 * @param threshold - Percentage of element visibility needed to trigger (0-1)
 * @param rootMargin - Margin around viewport (e.g., '0px 0px -100px 0px')
 * @param triggerOnce - Whether to trigger animation only once
 * @returns ref - Attach this to the element you want to animate
 */
export function useScrollAnimation(
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');

                        // Optionally unobserve after first trigger
                        if (triggerOnce) {
                            observer.unobserve(entry.target);
                        }
                    } else if (!triggerOnce) {
                        // Remove visible class if repeating animations
                        entry.target.classList.remove('visible');
                    }
                });
            },
            {
                threshold,
                rootMargin
            }
        );

        const element = elementRef.current;
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold, rootMargin, triggerOnce]);

    return elementRef;
}
