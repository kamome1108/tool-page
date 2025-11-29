'use client';

import dynamic from 'next/dynamic';
import { ToolContent } from '@/app/types/tool';

const ImageBlurClient = dynamic(() => import('./ImageBlurClient'), {
    ssr: false,
    loading: () => <div className="min-h-[600px] flex items-center justify-center">Loading...</div>
});

interface Props {
    locale: string;
    content: ToolContent;
}

export default function ImageBlurWrapper(props: Props) {
    return <ImageBlurClient {...props} />;
}
