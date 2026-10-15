import {test} from 'node:test';
import assert from 'node:assert/strict';
import {questions,grade} from '../lib/questions.ts';
test('24 unique questions, 12 per module, with valid keys and explanations',()=>{assert.equal(questions.length,24);assert.equal(new Set(questions.map(q=>q.id)).size,24);for(const mode of ['ismiyah','filiyah'])assert.equal(questions.filter(q=>q.mode===mode).length,12);for(const q of questions){assert.ok(q.explanation);assert.ok(grade(q,q.answer));assert.ok(!grade(q,null));for(const a of Array.isArray(q.answer)?q.answer:[q.answer])assert.ok(a>=0&&a<q.options.length)}});

import {POST} from '../app/api/attempts/route.ts';
import {GET} from '../app/api/quiz/route.ts';
const submit=(mode:string,answers:unknown[])=>POST(new Request('http://localhost/api/attempts',{method:'POST',body:JSON.stringify({mode,answers})}));
test('quiz never exposes keys before submission',async()=>{const r=await GET(new Request('http://localhost/api/quiz?mode=mixed'));const data=await r.json();assert.equal(data.length,24);assert.ok(data.every((q:any)=>!('answer' in q)&&!('explanation' in q)))});
test('all correct produces 100 percent and full review',async()=>{const r=await submit('mixed',questions.map(q=>q.answer));assert.equal(r.status,200);const data=await r.json();assert.equal(data.score,24);assert.equal(data.review.length,24);assert.ok(data.review.every((r:any)=>r.correct&&r.explanation))});
test('wrong answer is marked wrong and original key returned',async()=>{const answers=questions.map(q=>q.answer);answers[0]=1;const data=await(await submit('mixed',answers)).json();assert.equal(data.score,23);assert.equal(data.review[0].correct,false);assert.equal(data.review[0].answer,0)});
test('both modules grade separately',async()=>{for(const mode of ['ismiyah','filiyah']){const data=await(await submit(mode,questions.filter(q=>q.mode===mode).map(q=>q.answer))).json();assert.equal(data.score,12);assert.equal(data.total,12)}});
test('reject incomplete, invalid mode, malformed and duplicate-token answers',async()=>{assert.equal((await submit('mixed',[])).status,400);assert.equal((await submit('invalid',[])).status,400);const answers=questions.map(q=>q.answer);answers[0]=99;assert.equal((await submit('mixed',answers)).status,400);answers[0]=0;answers[4]=[0,0];assert.equal((await submit('mixed',answers)).status,400)});
