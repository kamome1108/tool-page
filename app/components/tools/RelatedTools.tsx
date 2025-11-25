import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Card } from '@/app/components/ui/Card';
import { relatedTools } from '@/app/config/relatedTools';
import { tools } from '@/app/config/tools';

interface RelatedToolsProps {
    toolId: string;
    locale: string;
}

export default function RelatedTools({ toolId, locale }: RelatedToolsProps) {
    const t = useTranslations('Common.relatedTools'); // We'll need to add this translation key
    const relatedIds = relatedTools[toolId] || [];

    if (relatedIds.length === 0) return null;

    // Filter tools to ensure they exist in our config
    const relatedToolObjects = relatedIds
        .map(id => tools.find(t => t.id === id))
        .filter((t): t is NonNullable<typeof t> => t !== undefined);

    if (relatedToolObjects.length === 0) return null;

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('title', { defaultMessage: 'Related Tools' })}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedToolObjects.map((tool) => (
                    <Link key={tool.id} href={`/tools/${tool.slug}`} className="block group">
                        <Card className="h-full hover:shadow-md transition-shadow duration-200 border border-gray-200">
                            <div className="flex flex-col h-full">
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200 origin-left">
                                    {tool.icon}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                    {/* We need to handle translations dynamically or pass them in. 
                                        For now, we'll use a fallback or fetch from messages if possible, 
                                        but since this is a client component, we rely on passed props or simple logic.
                                        Ideally, we'd use useTranslations with a dynamic key, but that's tricky.
                                        Let's assume the tool object has enough info or we use a generic label.
                                        Actually, best practice is to use the translation key.
                                    */}
                                    {/* Temporary: Display tool name from config or a generic placeholder. 
                                        Real implementation should fetch translated name. 
                                        For this pilot, we will use the English name from config as fallback 
                                        or try to look it up if we had access to all messages.
                                        Let's use a simple approach: The tool config has the ID. 
                                        We can try `t(`Tools.${tool.id}.meta.title`)` but `t` is scoped.
                                        
                                        Better approach: Just render the tool ID/Slug nicely for now, 
                                        or accept that we need to pass translated titles.
                                    */}
                                    <TranslatedToolTitle toolId={tool.id} />
                                </h3>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// Helper to get translated title
function TranslatedToolTitle({ toolId }: { toolId: string }) {
    const t = useTranslations(`Tools.${toolId}.meta`);
    return <>{t('title')}</>;
}
