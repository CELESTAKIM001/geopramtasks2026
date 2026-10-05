import crypto from 'crypto';
import { cookies } from 'next/headers';
const secret=()=>process.env.SESSION_SECRET || 'change-me';
export function sign(value:string){return crypto.createHmac('sha256',secret()).update(value).digest('hex')}
export function makeToken(value:string){return `${value}.${sign(value)}`}
export function verifyToken(token:string){const i=token.lastIndexOf('.'); if(i<1)return null; const value=token.slice(0,i),sig=token.slice(i+1); const expected=sign(value); if(sig.length!==expected.length)return null; return crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected))?value:null}
export async function setUserSession(email:string){const c=await cookies(); c.set('gp_user',makeToken(email),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*24*7})}
export async function getUserEmail(){const c=await cookies(); const v=c.get('gp_user')?.value; return v?verifyToken(v):null}
export async function setAdminSession(){const c=await cookies(); c.set('gp_admin',makeToken('admin'),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*8})}
export async function isAdmin(){const c=await cookies(); const v=c.get('gp_admin')?.value; return !!v&&verifyToken(v)==='admin'}
export function randomOtp(){return String(crypto.randomInt(100000,1000000))}
export function hashOtp(otp:string){return crypto.createHash('sha256').update(otp+(process.env.OTP_SECRET||'change')).digest('hex')}
export function signedDownloadToken(email:string,txId:string,taskId:string){const value=`${email}|${txId}|${taskId}|${Date.now()+48*60*60*1000}`; return makeToken(value)}
export function verifyDownloadToken(token:string){const value=verifyToken(token); if(!value)return null; const parts=value.split('|'); if(parts.length!==4)return null; if(Number(parts[3])<Date.now())return null; return value}
