const menuButton=document.querySelector('.mobile-menu'),links=document.querySelector('.links');menuButton.addEventListener('click',()=>{const open=links.classList.toggle('open');menuButton.setAttribute('aria-expanded',open);menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));
document.addEventListener('click',event=>{if(!links.classList.contains('open')||event.target.closest('nav'))return;links.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu')});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&links.classList.contains('open')){links.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');menuButton.focus()}});
window.addEventListener('resize',()=>{if(window.innerWidth>=801){links.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu')}});
const track=document.querySelector('.carousel-track'),cards=[...document.querySelectorAll('.gallery-card')];function scrollGallery(d){track.scrollBy({left:track.clientWidth*.82*d,behavior:'smooth'})}document.querySelector('.prev').addEventListener('click',()=>scrollGallery(-1));document.querySelector('.next').addEventListener('click',()=>scrollGallery(1));track.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();scrollGallery(e.key==='ArrowRight'?1:-1)}});
const lightbox=document.querySelector('.lightbox'),boxImage=lightbox.querySelector('img'),caption=lightbox.querySelector('figcaption');let activeIndex=0;function showImage(i){activeIndex=(i+cards.length)%cards.length;const source=cards[activeIndex].querySelector('img');boxImage.src=source.src;boxImage.alt=source.alt;caption.textContent=`${cards[activeIndex].querySelector('span').textContent} — ${activeIndex+1} de ${cards.length}`}function openBox(i){showImage(i);lightbox.showModal();document.body.style.overflow='hidden'}function closeBox(){lightbox.close();document.body.style.overflow='';cards[activeIndex].focus()}cards.forEach((card,i)=>card.addEventListener('click',()=>openBox(i)));document.querySelector('.lightbox-close').addEventListener('click',closeBox);document.querySelector('.lightbox-prev').addEventListener('click',()=>showImage(activeIndex-1));document.querySelector('.lightbox-next').addEventListener('click',()=>showImage(activeIndex+1));lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeBox()});lightbox.addEventListener('close',()=>document.body.style.overflow='');document.addEventListener('keydown',e=>{if(!lightbox.open)return;if(e.key==='ArrowLeft')showImage(activeIndex-1);if(e.key==='ArrowRight')showImage(activeIndex+1)});
let touchStartX=0;lightbox.addEventListener('touchstart',event=>{touchStartX=event.changedTouches[0].clientX},{passive:true});lightbox.addEventListener('touchend',event=>{const distance=event.changedTouches[0].clientX-touchStartX;if(Math.abs(distance)>55)showImage(activeIndex+(distance<0?1:-1))},{passive:true});

const showcaseVideo=document.querySelector('.video-frame video');
if(showcaseVideo){
  const videoObserver=new IntersectionObserver(([entry])=>{
    if(entry.isIntersecting){showcaseVideo.play().catch(()=>{});}else{showcaseVideo.pause();}
  },{threshold:.45});
  videoObserver.observe(showcaseVideo);
}

const orderForm=document.querySelector('#order-form');
if(orderForm){
  orderForm.addEventListener('submit',event=>{
    event.preventDefault();
    if(!orderForm.reportValidity())return;
    const data=new FormData(orderForm);
    const message=[
      'Olá! Gostaria de consultar um pedido personalizado na Dau Bijuterias.',
      '',
      `Nome: ${data.get('nome')}`,
      `Telefone: ${data.get('telefone')}`,
      `Tipo de peça: ${data.get('tipo')}`,
      `Ocasião: ${data.get('ocasiao')}`,
      `Cores preferidas: ${data.get('cores')||'Não informadas'}`,
      `Faixa de investimento: ${data.get('orcamento')}`,
      '',
      `Detalhes do pedido: ${data.get('detalhes')}`,
      '',
      'Gostaria de saber se é possível produzir esta peça, o prazo e o valor.'
    ].join('\n');
    window.open(`https://wa.me/5531987504077?text=${encodeURIComponent(message)}`,'_blank','noopener');
  });
}
