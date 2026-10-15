import {questions} from '../../../lib/questions.ts';
export async function GET(req:Request){const mode=new URL(req.url).searchParams.get('mode');if(!['ismiyah','filiyah','mixed'].includes(mode||''))return Response.json({error:'Mode latihan tidak valid.'},{status:400});return Response.json(questions.filter(q=>mode==='mixed'||q.mode===mode).map(({answer,explanation,...q})=>q))}
