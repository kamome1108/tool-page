import React from 'react';

interface CardProps {
    children: React.ReactNode;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    className?: string;
    onClick?: () => void;
}

export const Card: React.FC<CardProps & React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    padding = 'md',
    hover = false,
    className = '',
    onClick,
    ...props
}) => {
    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const hoverStyles = hover
        ? 'hover:shadow-xl hover:border-transparent transition-all duration-300 cursor-pointer'
        : '';

    return (
        <div
            className={`
        bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden
        ${paddings[padding]}
        ${hoverStyles}
        ${className}
      `}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};
