"use client"
import { useState } from 'react'
import { DEMOS, type DemoCategory } from '@/lib/demos'
import styles from './portfolio.module.css'
export function Portfolio() {
 const [filter,setFilter]=useState<'all'|DemoCategory>('all')
 const [selected,setSelected]=useState(DEMOS[0].name)
 const demos=DEMOS.filter(d=>filter==='all'||d.category===filter)
 const demo=demos.find(d=>d.name===selected)??demos[0]
 const index=demos.indexOf(demo)
 function consult(){window.dispatchEvent(new CustomEvent('titan:select-demo',{detail:{demo:demo.name,solution:demo.solution}}));document.getElementById('contact')?.scrollIntoView({behavior:'instant'})}
 return <section id="portfolio" aria-labelledby="portfolio-heading" className={"v5-section "+styles.portfolio}><div className={"v5-wrap "+styles.container}>
  <div className={"v5-heading "+styles.heading}><div><p className="v5-kicker">Projects</p><h2 id="portfolio-heading" className="v5-title">실제 화면으로 <span>확인하세요.</span></h2></div><p className="v5-desc">공개 데모를 기반으로 브랜드, 콘텐츠, 운영 방식에 맞춰 수정·구축합니다. 관리자, 파트너 페이지 데모는 도입 상담 과정에서 안내 드리겠습니다.</p></div>
  <div className={styles.workspace}>
   <div className={styles.catalog}><div className={styles.filters} role="group" aria-label="데모 분류 필터">{([{value:'all',label:'전체'},{value:'casino',label:'카지노'},{value:'tojino',label:'토지노'}] as const).map(f=><button key={f.value} aria-pressed={filter===f.value} onClick={()=>{setFilter(f.value);setSelected(DEMOS.find(d=>f.value==='all'||d.category===f.value)!.name)}}>{f.label}</button>)}</div>
    <div className={styles.list} aria-label="데모 선택">{demos.map((d,i)=><button key={d.name} aria-pressed={demo.name===d.name} onClick={()=>setSelected(d.name)}><span>{String(i+1).padStart(2,'0')}</span><span>{d.name}</span><span aria-hidden>↗</span></button>)}</div>
   </div>
   <div className={styles.preview}><div className={styles.browserBar}><span><i/><i/><i/></span><span>LIVE PREVIEW</span><span>{String(index+1).padStart(2,'0')} / {String(demos.length).padStart(2,'0')}</span></div><a href={demo.href} target="_blank" rel="noopener noreferrer" aria-label={demo.name+' 라이브 데모 보기, 새 창 열림'} className={styles.imageLink}><img key={demo.image} src={demo.image} alt={demo.name+' 공개 데모 화면'} width={1200} height={675}/><span>라이브 데모 열기 ↗</span></a><div className={styles.caption}><div><p>{demo.categoryLabel}</p><h3>{demo.name}</h3></div><button className="v5-link" onClick={consult}>상담에 추가 <span aria-hidden>↗</span></button></div><div className={styles.controls}><button aria-label="이전 데모" disabled={index===0} onClick={()=>setSelected(demos[index-1].name)}>←</button><button aria-label="다음 데모" disabled={index===demos.length-1} onClick={()=>setSelected(demos[index+1].name)}>→</button></div></div>
  </div>
 </div></section>
}
