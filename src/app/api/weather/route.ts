import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();

    console.log("received data:", data);

    return NextResponse.json({
        message: "Data received",
        data: data,
        success: true
    });
}

export async function GET() {
    return NextResponse.json({
        message: "Working yey putem sa vedem vremea"
    });
}