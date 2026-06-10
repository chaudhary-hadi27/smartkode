"use client";

import { AboutPageTemplate } from '@/components/about/AboutPageTemplate';
import { getAboutPageData } from '@/data/about/aboutData';

export default function MissionPage() {
    const data = getAboutPageData('mission');
    if (!data) return <div>Page not found</div>;

    return <AboutPageTemplate data={data} />;
}