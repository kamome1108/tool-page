'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface GpaCalculatorClientProps {
    locale: string;
}

interface Course {
    id: number;
    name: string;
    grade: number;
    credits: number;
}

export default function GpaCalculatorClient({ locale }: GpaCalculatorClientProps) {
    const t = useTranslations('Tools.gpa-calculator');
    const [courses, setCourses] = useState<Course[]>([
        { id: 1, name: '', grade: 4.0, credits: 3 },
        { id: 2, name: '', grade: 4.0, credits: 3 },
        { id: 3, name: '', grade: 4.0, credits: 3 },
    ]);
    const [gpa, setGpa] = useState<number | null>(null);
    const [totalCredits, setTotalCredits] = useState<number | null>(null);

    const addCourse = () => {
        setCourses([...courses, { id: Date.now(), name: '', grade: 4.0, credits: 3 }]);
    };

    const removeCourse = (id: number) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const updateCourse = (id: number, field: keyof Course, value: string | number) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const calculateGpa = () => {
        let totalPoints = 0;
        let totalCreds = 0;

        courses.forEach(course => {
            totalPoints += course.grade * course.credits;
            totalCreds += course.credits;
        });

        if (totalCreds > 0) {
            setGpa(totalPoints / totalCreds);
            setTotalCredits(totalCreds);
        } else {
            setGpa(0);
            setTotalCredits(0);
        }
    };

    const handleReset = () => {
        setCourses([
            { id: 1, name: '', grade: 4.0, credits: 3 },
            { id: 2, name: '', grade: 4.0, credits: 3 },
            { id: 3, name: '', grade: 4.0, credits: 3 },
        ]);
        setGpa(null);
        setTotalCredits(null);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Course Input Section */}
                <div className="lg:col-span-2 space-y-4">
                    <Card padding="md" className="space-y-4">
                        {courses.map((course, index) => (
                            <div key={course.id} className="flex flex-col md:flex-row gap-4 items-end md:items-center bg-gray-50 p-3 rounded-md">
                                <div className="flex-1 w-full">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        {t('ui.course')} {index + 1}
                                    </label>
                                    <input
                                        type="text"
                                        value={course.name}
                                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    />
                                </div>
                                <div className="w-full md:w-24">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        {t('ui.grade')}
                                    </label>
                                    <select
                                        value={course.grade}
                                        onChange={(e) => updateCourse(course.id, 'grade', parseFloat(e.target.value))}
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    >
                                        <option value="4.0">A (4.0)</option>
                                        <option value="3.7">A- (3.7)</option>
                                        <option value="3.3">B+ (3.3)</option>
                                        <option value="3.0">B (3.0)</option>
                                        <option value="2.7">B- (2.7)</option>
                                        <option value="2.3">C+ (2.3)</option>
                                        <option value="2.0">C (2.0)</option>
                                        <option value="1.7">C- (1.7)</option>
                                        <option value="1.3">D+ (1.3)</option>
                                        <option value="1.0">D (1.0)</option>
                                        <option value="0.0">F (0.0)</option>
                                    </select>
                                </div>
                                <div className="w-full md:w-24">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        {t('ui.credits')}
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={course.credits}
                                        onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    />
                                </div>
                                <div className="w-full md:w-auto flex justify-end">
                                    <button
                                        onClick={() => removeCourse(course.id)}
                                        className="text-red-500 hover:text-red-700 p-2"
                                        disabled={courses.length <= 1}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between pt-2">
                            <Button variant="outline" onClick={addCourse}>
                                + {t('ui.addCourse')}
                            </Button>
                            <Button variant="secondary" onClick={handleReset}>
                                {t('ui.reset')}
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Result Section */}
                <div className="lg:col-span-1">
                    <Card padding="md" className="sticky top-6 space-y-6 bg-blue-50 border-blue-100">
                        <div className="text-center space-y-2">
                            <h3 className="text-gray-600 text-sm uppercase tracking-wide">{t('ui.semesterGPA')}</h3>
                            <div className="text-5xl font-bold text-blue-700">
                                {gpa !== null ? gpa.toFixed(2) : '-.--'}
                            </div>
                        </div>
                        <div className="text-center space-y-1">
                            <h3 className="text-gray-600 text-xs uppercase tracking-wide">{t('ui.totalCredits')}</h3>
                            <div className="text-xl font-semibold text-gray-800">
                                {totalCredits !== null ? totalCredits : '-'}
                            </div>
                        </div>
                        <Button onClick={calculateGpa} className="w-full" size="lg">
                            {t('ui.calculate')}
                        </Button>
                    </Card>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500">
                {t('ui.processingNote')}
            </div>
        </div>
    );
}
