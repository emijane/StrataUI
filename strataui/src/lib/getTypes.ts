// lib/getTypes.ts

import { supabase } from './supabaseClient';

export async function getTypes() {
    const { data, error } = await supabase
        .from('strataui_db')
        .select('type, type_slug')
        .neq('type_slug', null);

    if (error) {
        console.error('Error fetching types:', error);
        return [];
    }

    const unique = Array.from(new Map(data.map(item => [item.type_slug, item])).values());
    return unique;
}
