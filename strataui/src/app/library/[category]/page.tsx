// app/library/[category]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import ClientToolkitFetcher from '@/components/library/ClientToolkitFetcher';

type Props = {
    params: { category: string };
};

const prettifySlug = (slug: string) =>
    slug
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');

async function getTypeRow(slug: string) {
    const { data, error } = await supabase
        .from('types')
        .select('name, slug, description')
        .eq('slug', slug)
        .single();

    if (error) return null;
    return data as { name: string; slug: string; description?: string | null };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = params.category;
    const typeRow = await getTypeRow(slug);

    const categoryName = typeRow?.name ?? prettifySlug(slug);
    const dbDescription =
        typeRow?.description ??
        `Explore our curated collection of ${categoryName.toLowerCase()} tools and libraries. Find the perfect UI components, design systems, and development resources for your next project.`;

    const title = `${categoryName} | StrataUI`;

    return {
        title,
        description: dbDescription,
        keywords: [
            categoryName,
            'UI library',
            'frontend tools',
            'component library',
            'design systems',
            'developer tools',
        ],
        openGraph: {
            title,
            description: dbDescription,
            url: `https://strataui.dev/library/${slug}`,
            siteName: 'StrataUI',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: dbDescription,
        },
        alternates: {
            canonical: `https://strataui.dev/library/${slug}`,
        },
        // Optional, but nice for search engines:
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function CategoryPage({ params }: Props) {
    const slug = params.category;
    const typeRow = await getTypeRow(slug);

    if (!typeRow) {
        notFound();
    }

    const categoryName = typeRow?.name ?? prettifySlug(slug);

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Library',
                item: 'https://strataui.dev/library',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: categoryName,
                item: `https://strataui.dev/library/${slug}`,
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <main className="relative min-h-screen overflow-visible max-w-full items-center justify-center mx-auto">
                {/* Content */}
                <div className="relative z-10 mx-auto">
                    <ClientToolkitFetcher typeSlug={slug} />
                </div>
            </main>
        </>
    );
}
