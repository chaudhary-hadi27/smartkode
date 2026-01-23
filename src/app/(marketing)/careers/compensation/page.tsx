"use client";

import { CareerPageTemplate } from '@/components/careers/CareerPageTemplate';
import { getCareerPageData } from '@/data/careers/careersData';

export default function CompensationPage() {
    const data = getCareerPageData('compensation');
    if (!data) return <div>Page not found</div>;

    return <CareerPageTemplate data={data} />;
}