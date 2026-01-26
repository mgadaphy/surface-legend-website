import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for animating numbers counting up from 0
 * Triggers when element enters viewport using Intersection Observer
 * 
 * @param endValue - The final number to count up to
 * @param duration - Animation duration in milliseconds (default: 2000)
 * @param delay - Optional delay before starting animation (default: 0)
 */
export function useCounterAnimation(
    endValue: number,
    duration: number = 2000,
    delay: number = 0
) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);

                        // If reduced motion, just show the final value instantly
                        if (prefersReducedMotion) {
                            setCount(endValue);
                            return;
                        }

                        // Start animation after optional delay
                        const timeout = setTimeout(() => {
                            const startTime = performance.now();
                            const easeOutQuad = (t: number) => t * (2 - t);

                            const animate = (currentTime: number) => {
                                const elapsed = currentTime - startTime;
                                const progress = Math.min(elapsed / duration, 1);
                                const easedProgress = easeOutQuad(progress);

                                setCount(Math.round(easedProgress * endValue));

                                if (progress < 1) {
                                    requestAnimationFrame(animate);
                                }
                            };

                            requestAnimationFrame(animate);
                        }, delay);

                        return () => clearTimeout(timeout);
                    }
                });
            },
            { threshold: 0.3 } // Trigger when 30% visible
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [endValue, duration, delay, hasAnimated]);

    return { count, ref: elementRef };
}
