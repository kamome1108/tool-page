import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    background?: 'white' | 'gray';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    className?: string;
    id?: string;
}

export const Section: React.FC<SectionProps> = ({
    children,
    background = 'white',
    padding = 'md',
    className = '',
    id,
}) => {
    const backgrounds = {
        white: 'bg-white',
        gray: 'bg-gray-50',
    };

    const paddings = {
        none: '',
        sm: 'py-8 sm:py-12',
        md: 'py-12 sm:py-16 lg:py-20',
        lg: 'py-16 sm:py-24 lg:py-32',
    };

    return (
        <section
            id={id}
            className={`
        ${backgrounds[background]}
        ${paddings[padding]}
        ${className}
      `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </section>
    );
};
