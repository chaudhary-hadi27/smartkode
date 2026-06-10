"use client";

import { CareerPageTemplate } from '@/components/careers/CareerPageTemplate';
import { getCareerPageData } from '@/data/careers/careersData';

export default function PositionsPage() {
    const data = getCareerPageData('positions');
    if (!data) return <div>Page not found</div>;

    return <CareerPageTemplate data={data} />;
}