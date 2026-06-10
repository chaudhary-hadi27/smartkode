"use client";

import { AboutPageTemplate } from '@/components/about/AboutPageTemplate';
import { getAboutPageData } from '@/data/about/aboutData';

export default function VisionPage() {
    const data = getAboutPageData('vision');
    if (!data) return <div>Page not found</div>;

    return <AboutPageTemplate data={data} />;
}
