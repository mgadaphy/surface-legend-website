import React from 'react';

/**
 * S-Curve Divider Component
 * 
 * Logo-inspired flowing SVG divider that reinforces Surface Legend brand identity.
 * The S-curve echoes the flowing shape of the logo's "S", creating visual consistency
 * across digital touchpoints.
 * 
 * Design System: Craftsmanship Modernism v2.0
 */

interface SCurveDividerProps {
    variant?: 'default' | 'reverse' | 'subtle';
    className?: string;
}

export function SCurveDivider({ variant = 'default', className = '' }: SCurveDividerProps) {
    const gradientId = `gradient-scurve-${variant}`;

    // Different gradient configurations for visual variety
    const gradients = {
        default: {
            start: '#1E3A5F',
            startOpacity: '0.1',
            end: '#14B8A6',
            endOpacity: '0.2'
        },
        reverse: {
            start: '#14B8A6',
            startOpacity: '0.2',
            end: '#1E3A5F',
            endOpacity: '0.1'
        },
        subtle: {
            start: '#1E3A5F',
            startOpacity: '0.05',
            end: '#14B8A6',
            endOpacity: '0.1'
        }
    };

    const gradient = gradients[variant];

    return (
        <svg
            className={`w-full h-8 md:h-12 ${className}`}
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop
                        offset="0%"
                        stopColor={gradient.start}
                        stopOpacity={gradient.startOpacity}
                    />
                    <stop
                        offset="100%"
                        stopColor={gradient.end}
                        stopOpacity={gradient.endOpacity}
                    />
                </linearGradient>
            </defs>

            {/* S-curve path inspired by Surface Legend logo */}
            <path
                d="M0,30 Q300,0 600,30 T1200,30 L1200,60 L0,60 Z"
                fill={`url(#${gradientId})`}
            />
        </svg>
    );
}

/**
 * Usage Examples:
 * 
 * <SCurveDivider variant="default" />
 * <SCurveDivider variant="reverse" className="my-8" />
 * <SCurveDivider variant="subtle" />
 */
