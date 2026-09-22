'use client';
import { useEffect } from 'react';
export function QaProbe() {
  useEffect(()=>{
    console.info('[sports-qa] environment',JSON.stringify({innerWidth,innerHeight,screen:{width:screen.width,height:screen.height,availWidth:screen.availWidth,availHeight:screen.availHeight},devicePixelRatio,visualViewportScale:visualViewport?.scale,cssZoom:getComputedStyle(document.documentElement).zoom}));
    Promise.all([400,700,800].map(async weight=>({weight,faces:(await document.fonts.load(`${weight} 16px "Pretendard JP"`,'가나다 ABC 0123')).map(f=>({family:f.family,status:f.status,weight:f.weight}))}))).then(result=>console.info('[sports-qa] font-load',JSON.stringify(result)));
    const down=(event:MouseEvent)=>{const button=(event.target as Element).closest('.odd') as HTMLButtonElement|null;if(!button)return;const style=getComputedStyle(button);console.info('[sports-qa] mouse-down',JSON.stringify({id:button.dataset.pick,active:button.matches(':active'),disabled:button.disabled,background:style.background,shadow:style.boxShadow,transform:style.transform,pressed:button.getAttribute('aria-pressed')}));};
    document.addEventListener('mousedown',down);
    return ()=>document.removeEventListener('mousedown',down);
  },[]);
  return null;
}
