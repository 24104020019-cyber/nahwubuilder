import {questions,grade} from '../../../lib/questions.ts';
export async function POST(req:Request){
 try {
 const b=await req.json();
 if(!['ismiyah','filiyah','mixed'].includes(b.mode)) return Response.json({error:'Mode latihan tidak valid.'},{status:400});
 const qs=questions.filter(q=>b.mode==='mixed'||q.mode===b.mode);
 if(!Array.isArray(b.answers)||b.answers.length!==qs.length) return Response.json({error:'Jumlah jawaban tidak sesuai.'},{status:400});
 const valid=qs.every((q,i)=>{const a=b.answers[i];return q.kind==='build'?Array.isArray(a)&&a.length===q.options.length&&new Set(a).size===a.length&&a.every(n=>Number.isInteger(n)&&n>=0&&n<q.options.length):Number.isInteger(a)&&a>=0&&a<q.options.length});
 if(!valid) return Response.json({error:'Ada jawaban yang belum lengkap atau tidak valid.'},{status:400});
 const review=qs.map((q,i)=>({id:q.id,correct:grade(q,b.answers[i]),answer:q.answer,explanation:q.explanation}));
 return Response.json({score:review.filter(r=>r.correct).length,total:qs.length,review});
 }catch{return Response.json({error:'Permintaan tidak dapat dibaca.'},{status:400})}
}
