import {NextResponse} from 'next/server'; import {sendOtp} from '@/lib/mailer';
export async function POST(){return NextResponse.json({message:'Please contact 0702781490 or info@geopramtech.co.ke'});}
