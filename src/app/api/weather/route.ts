import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rsomoajidtfdtzuvgnhc.supabase.co",
  "sb_publishable_2jk2iyIOR1DyVMlfz3-iLg_-Oer1ejd"
);

export async function POST(req: NextRequest) {
  const data = await req.json();

  const payload = {
    temperature: data.temperature,
    humidity: data.humidity,
    air_quality: data.air_quality,
    timestamp: data.timestamp || new Date(),
  };
  console.log("Payload sent to Supabase + FastAPI:", payload);

  // first save in supabase
  const { error } = await supabase
    .from("weather_data")
    .insert([
      payload,
    ]);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ success: false, error });
  }

  // then to uvicorn pt robert
   try {
    const response = await fetch("http://localhost:8000/sensor-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log("FastAPI response:", {
    status: response.status,
    body: text,
    });

    if (!response.ok) {
      console.error("FastAPI error:", response.status, text);
      return NextResponse.json(
        {
          success: false,
          error: text,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Python server unreachable:", err);

    return NextResponse.json(
      {
        success: false,
        error: "Python server unreachable",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const {data, error}  =await supabase
    .from("weather_data")
    .select("*")
    .order("timestamp", { ascending: true })
    .limit(50);


  if (error) {
    return NextResponse.json({
      success: false,
      error
    })
  }

  return NextResponse.json({
    success: true,
    data,
  });
}

