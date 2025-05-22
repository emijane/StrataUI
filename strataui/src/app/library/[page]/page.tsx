'use client';

import { useParams, usePathname } from 'next/navigation';
import Head from 'next/head';
import ToolkitFetcher from '@/components/library/ToolkitFetcher';

export default function TypePage() {
    const { type } = useParams();
    const pathname = usePathname();

    const readableTitle = String(type)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

    return (
        <>
            <Head>
                <title>{readableTitle} | StrataUI</title>
                <meta
                    name="description"
                    content={`Explore ${readableTitle} toolkits curated to enhance your workflow.`}
                />
                <link rel="canonical" href={`https://strataui.dev${pathname}`} />
                {pathname.includes('?') && <meta name="robots" content="noindex" />}
            </Head>
            <div className="relative z-10 mx-auto">
                <ToolkitFetcher typeSlug={type as string}/>
            </div>
        </>
    );
}
