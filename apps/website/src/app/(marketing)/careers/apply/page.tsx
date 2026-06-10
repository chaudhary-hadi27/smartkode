"use client";

import { Toaster } from 'react-hot-toast';
import { CareerPageTemplate } from '@/components/careers/CareerPageTemplate';
import { CareerApplicationForm } from '@/components/careers/CareerApplicationForm';
import { getCareerPageData } from '@/data/careers/careersData';

export default function ApplyPage() {
    const data = getCareerPageData('apply');
    if (!data) return <div>Page not found</div>;

    return (
        <>
            <Toaster position="top-right" />
            <CareerPageTemplate data={data}>
                <CareerApplicationForm />
            </CareerPageTemplate>
        </>
    );
}