import { NextResponse } from "next/server";
import axios from "axios";
const cache = new Map();

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("ip");

    if (cache.has(query)) {
        const cachedData = cache.get(query);
        return NextResponse.json({ ...cachedData, cached: true });
    }

    try {
        const response = await axios.get(`https://ipinfo.io/${query}/json`);

        cache.set(query, { ...response.data, cached: false });

        return NextResponse.json({ ...response.data, cached: false });
    } catch (error) {
        return NextResponse.json({ error: 'API Error', requestDetails: error }, { status: 500 })
    }
}
