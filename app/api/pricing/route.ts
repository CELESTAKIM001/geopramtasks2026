import {NextResponse} from 'next/server';
import {getDb} from '@/lib/db';
import {DEFAULT_PRICING,calculateBundle} from '@/lib/pricing';

export async function GET(){
  const db=await getDb();
  const pricing=await db.collection('pricing').findOne({key:'main'})||DEFAULT_PRICING;
  return NextResponse.json({...pricing,bundle:{...pricing.bundle,...calculateBundle(pricing)}});
}
