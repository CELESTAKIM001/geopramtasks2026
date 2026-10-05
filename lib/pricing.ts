export const DEFAULT_PRICING={
  tasks:[
    {id:'1',name:'Task 1 — Laikipia East Primary Schools Map',price:1000},
    {id:'2',name:'Task 2 — GIS Task Output',price:2000},
    {id:'3',name:'Task 3 — GIS Task Output',price:1500}
  ],
  bundle:{name:'All 3 Tasks — Discount Bundle',discountPercent:20}
};

export function calculateBundle(pricing:any){
  const total=pricing.tasks.reduce((sum:number,t:any)=>sum+Number(t.price||0),0);
  const percent=Math.min(100,Math.max(0,Number(pricing.bundle?.discountPercent||0)));
  const discount=Math.round(total*percent/100);
  const price=Math.max(0,total-discount);
  return {total,discount,price,discountPercent:percent};
}

export const TASK_FILES=(id:string)=>({pdf:`task${id}.pdf`,svg:`task${id}.svg`});
