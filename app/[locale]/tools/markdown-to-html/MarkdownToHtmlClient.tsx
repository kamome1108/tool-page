'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';
import { marked } from 'marked';

export default function MarkdownToHtmlClient() {
    const t = useTranslations('Tools.markdown-to-html.ui');
    const [markdown, setMarkdown] = useState('');
    const [html, setHtml] = useState('');

    useEffect(() => {
        // Set default placeholder content
        setMarkdown(t('inputPlaceholder'));
    }, [t]);

    useEffect(() => {
        try {
            const parsed = marked.parse(markdown, { async: false });
            if (typeof parsed === 'string') {
                setHtml(parsed);
            } else {
                // Handle Promise if async is true (though we set async: false)
                Promise.resolve(parsed).then(res => setHtml(res));
            }
        } catch (e) {
            console.error(e);
        }
    }, [markdown]);

    const copyHtml = () => {
        navigator.clipboard.writeText(html).then(() => {
            toast.success(t('copied'));
        });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 h-[calc(100vh-200px)] min-h-[600px] flex flex-col">
            <Toaster position="bottom-right" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <div className="flex flex-col h-full">
                    <Card className="flex-1 flex flex-col p-0 overflow-hidden h-full">
                        <textarea
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            className="w-full h-full p-4 text-sm font-mono border-none resize-none focus:ring-0 bg-gray-50"
                            placeholder="# Type Markdown here..."
                        />
                    </Card>
                </div>

                <div className="flex flex-col h-full gap-4">
                    <Card className="flex-1 flex flex-col p-0 overflow-hidden h-full relative">
                        <div className="absolute top-0 right-0 p-2 z-10 bg-white/80 backdrop-blur-sm rounded-bl-lg border-b border-l border-gray-200">
                            <Button
                                onClick={copyHtml}
                                size="sm"
                                variant="ghost"
                                className="text-blue-600 hover:bg-blue-50"
                            >
                                {t('copyHtml')}
                            </Button>
                        </div>

                        <div className="flex-1 grid grid-rows-2 h-full divide-y divide-gray-200">
                            <div className="p-4 overflow-auto bg-white">
                                <div className="text-xs font-bold text-gray-400 uppercase mb-2">{t('preview')}</div>
                                <div
                                    className="prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: html }}
                                />
                            </div>
                            <div className="p-4 overflow-auto bg-gray-900 text-gray-100 font-mono text-xs">
                                <div className="text-xs font-bold text-gray-500 uppercase mb-2">{t('htmlOutput')}</div>
                                <pre className="whitespace-pre-wrap break-all">{html}</pre>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
