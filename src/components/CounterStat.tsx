import { useCounterAnimation } from "@/hooks/useCounterAnimation";

interface CounterStatProps {
    value: number;
    suffix?: string;
    label: string;
    delay?: number;
}

/**
 * Animated counter stat component
 * Displays a number that counts up from 0 when it enters the viewport
 */
export function CounterStat({ value, suffix = "", label, delay = 0 }: CounterStatProps) {
    const { count, ref } = useCounterAnimation(value, 2000, delay);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">
                {count}{suffix}
            </div>
            <div className="text-primary font-medium">{label}</div>
        </div>
    );
}
