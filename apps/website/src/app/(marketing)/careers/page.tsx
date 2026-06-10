"use client";

import { Toaster } from 'react-hot-toast';
import { CareerPageTemplate } from '@/components/careers/CareerPageTemplate';
import { getCareerPageData } from '@/data/careers/careersData';

export default function CareersPage() {
    const data = getCareerPageData('main');
    if (!data) return <div>Page not found</div>;

    return (
        <>
            <Toaster position="top-right" />
            <CareerPageTemplate data={data} />
        </>
    );
}