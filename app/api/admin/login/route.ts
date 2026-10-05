import {NextResponse} from 'next/server'; import {setAdminSession} from '@/lib/security';
export async function POST(req:Request){const {password}=await req.json(); if(!password||password!==process.env.ADMIN_PASSWORD)return NextResponse.json({error:'Invalid password'},{status:401}); await setAdminSession(); return NextResponse.json({ok:true});}
