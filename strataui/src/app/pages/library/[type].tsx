// pages/library/[type].tsx

import { useRouter } from 'next/router';
import ToolkitFetcher from '../../components/ToolkitFetcher';
import Head from 'next/head';

export default function TypePage() {
    const { type } = useRouter().query;

    return (
        <>
            <Head>
                <title>{type} | StrataUI</title>
            </Head>
            <ToolkitFetcher typeSlug={type as string} />
        </>
    );
}
