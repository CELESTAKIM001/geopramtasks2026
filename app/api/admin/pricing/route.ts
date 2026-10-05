import {NextResponse} from 'next/server';
import {getDb} from '@/lib/db';
import {isAdmin} from '@/lib/security';
import {DEFAULT_PRICING,calculateBundle} from '@/lib/pricing';

export async function GET(){
  if(!(await isAdmin())) return NextResponse.json({error:'Unauthorized'},{status:401});
  const db=await getDb();
  const pricing=await db.collection('pricing').findOne({key:'main'})||DEFAULT_PRICING;
  return NextResponse.json({...pricing,bundle:{...pricing.bundle,...calculateBundle(pricing)}});
}

export async function POST(req:Request){
  if(!(await isAdmin())) return NextResponse.json({error:'Unauthorized'},{status:401});
  const body=await req.json();
  const tasks=(Array.isArray(body.tasks)?body.tasks:DEFAULT_PRICING.tasks).map((t:any,i:number)=>({
    id:String(t.id||i+1),name:String(t.name||`Task ${i+1}`),price:Math.max(0,Math.round(Number(t.price)||0))
  }));
  const discountPercent=Math.min(100,Math.max(0,Number(body.bundle?.discountPercent)||0));
  const pricing={key:'main',tasks,bundle:{name:'All 3 Tasks — Discount Bundle',discountPercent},updatedAt:new Date()};
  const db=await getDb();
  await db.collection('pricing').updateOne({key:'main'},{$set:pricing},{upsert:true});
  return NextResponse.json({ok:true,pricing:{...pricing,bundle:{...pricing.bundle,...calculateBundle(pricing)}}});
}
