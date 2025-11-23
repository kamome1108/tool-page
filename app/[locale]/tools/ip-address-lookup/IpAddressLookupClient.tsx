'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Toaster, toast } from 'react-hot-toast';

interface IpData {
    ip: string;
    city: string;
    region: string;
    country_name: string;
    org: string; // ISP
    timezone: string;
}

export default function IpAddressLookupClient() {
    const t = useTranslations('Tools.ip-address-lookup.ui');
    const [data, setData] = useState<IpData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchIp = async () => {
        setLoading(true);
        setError('');
        setData(null);

        try {
            // Using ipapi.co for detailed info
            const response = await fetch('https://ipapi.co/json/');
            if (!response.ok) {
                throw new Error('Failed to fetch IP data');
            }
            const jsonData = await response.json();

            if (jsonData.error) {
                throw new Error(jsonData.reason || 'Failed to fetch IP data');
            }

            setData(jsonData);
        } catch (err) {
            console.error(err);
            setError(t('error'));

            // Fallback to ipify just for IP if detailed info fails
            try {
                const fallbackRes = await fetch('https://api.ipify.org?format=json');
                if (fallbackRes.ok) {
                    const fallbackData = await fallbackRes.json();
                    setData({
                        ip: fallbackData.ip,
                        city: '-',
                        region: '-',
                        country_name: '-',
                        org: '-',
                        timezone: '-'
                    });
                    setError(''); // Clear error if fallback succeeds
                }
            } catch (fallbackErr) {
                console.error('Fallback failed', fallbackErr);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIp();
    }, []);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success(t('copied'));
        });
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Toaster position="bottom-right" />

            <Card className="p-8">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-500">{t('loading')}</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <div className="text-red-500 mb-4">{error}</div>
                        <Button onClick={fetchIp} variant="outline">
                            {t('refresh')}
                        </Button>
                    </div>
                ) : data ? (
                    <div className="space-y-8 animate-fade-in">
                        <div className="text-center">
                            <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">{t('yourIp')}</div>
                            <div className="text-4xl md:text-5xl font-bold text-blue-600 font-mono mb-4 break-all">
                                {data.ip}
                            </div>
                            <Button
                                onClick={() => copyToClipboard(data.ip)}
                                variant="outline"
                                size="sm"
                                className="mx-auto"
                            >
                                {t('copy')}
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-8">
                            <InfoItem label={t('location')} value={`${data.city}, ${data.region}`} />
                            <InfoItem label={t('country')} value={data.country_name} />
                            <InfoItem label={t('isp')} value={data.org} />
                            <InfoItem label={t('timezone')} value={data.timezone} />
                        </div>

                        <div className="text-center pt-4">
                            <Button onClick={fetchIp} variant="ghost" className="text-gray-500 hover:text-blue-600">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                {t('refresh')}
                            </Button>
                        </div>
                    </div>
                ) : null}
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}

function InfoItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
            <div className="font-medium text-gray-900">{value || '-'}</div>
        </div>
    );
}
