'use client';

import ToolkitFetcher from './ToolkitFetcher';

type Props = {
  typeSlug?: string;
  subcategorySlug?: string;
};

export default function ClientToolkitFetcher({ typeSlug, subcategorySlug }: Props) {
  return <ToolkitFetcher typeSlug={typeSlug} subcategorySlug={subcategorySlug} />;
}