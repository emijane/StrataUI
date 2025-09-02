import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
    const { libraryId } = await req.json();
    if (!libraryId) return NextResponse.json({ ok: false }, { status: 400 });

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only
    );

    const { error } = await supabase.from('library_events').insert({
        library_id: libraryId,
        event_type: 'outbound_click'
    });

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
}