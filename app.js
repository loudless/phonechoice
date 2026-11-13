(() => {
  'use strict';
  const phones = window.PHONE_DIARY || [];
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const rub = n => new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
  let favorites = new Set();
  try { favorites = new Set(JSON.parse(localStorage.getItem('phone-diary-favorites-v1') || '[]').filter(id => phones.some(p => p.id === id))); } catch {}
  let filter = 'all';
  let budget = 50000;
  let toastTimer;
  const sourceName = url => { try { return new URL(url).hostname.replace(/^www\./,'').replace('xn--80aaibtga0ao6a.xn--p1ai','ПлэйЛаб'); } catch { return 'Источник'; } };
  const links = p => p.sources.map((source, i) => {
    const url = typeof source === 'string' ? source : source.url;
    const label = typeof source === 'string' ? sourceName(url) : source.label;
    return `<li><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a></li>`;
  }).join('');
  const card = (p, i) => `<article class="phone-card ${p.id === 'samsung-s26-fe' ? 'featured' : ''}" id="${esc(p.id)}" data-phone="${esc(p.id)}" aria-labelledby="title-${esc(p.id)}">
    <div class="card-top"><span class="number">№ ${String(i + 1).padStart(2,'0')}</span><span>${esc(p.tag)}</span><span aria-hidden="true">✦</span></div>
    <div class="card-body"><div class="card-main"><div><span class="card-brand">${esc(p.brand)}</span><h3 id="title-${esc(p.id)}">${esc(p.displayTitle || p.title)}</h3><span class="price-label">цена-ориентир</span><p class="card-price">${rub(p.price)}</p><span class="storage">${esc(p.storage)}</span></div><button type="button" class="card-image-wrap" data-photo="${esc(p.id)}" aria-label="Рассмотреть фото ${esc(p.title)}" aria-haspopup="dialog"><img src="${esc(p.image)}" alt="${esc(p.title)}" width="180" height="230" loading="lazy" decoding="async"><span class="photo-hint" aria-hidden="true"><svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="5"/><path d="M12 12l5 5M8 5v6M5 8h6"/></svg> фото</span></button></div>
    <p class="card-role">${esc(p.role)}</p><p class="card-description">${esc(p.description)}</p>
    <div class="verdict-box"><div class="verdict-row"><span aria-hidden="true">♥</span><div><strong>за что любить</strong><p>${esc(p.strengths.join(' '))}</p></div></div><div class="verdict-row"><span aria-hidden="true">↯</span><div><strong>с чем мириться</strong><p>${esc(p.compromises.join(' '))}</p></div></div></div>
    <div class="card-facts">${p.badges.map(s=>`<span>${esc(s)}</span>`).join('')}</div>
    <div class="card-actions"><div class="market-links" role="group" aria-label="Поиск ${esc(p.title)}, ${esc(p.storage)}"><a class="store-link market-yandex" href="${esc(p.marketplaces.yandex)}" target="_blank" rel="noopener noreferrer" aria-label="Искать ${esc(p.title)}, ${esc(p.storage)} на Яндекс Маркете">Яндекс Маркет <span aria-hidden="true">↗</span></a><a class="store-link market-ozon" href="${esc(p.marketplaces.ozon)}" target="_blank" rel="noopener noreferrer" aria-label="Искать ${esc(p.title)}, ${esc(p.storage)} на Ozon">Ozon <span aria-hidden="true">↗</span></a></div><button type="button" class="favorite-btn" data-favorite="${esc(p.id)}" aria-pressed="false" aria-label="Добавить ${esc(p.title)} в любимчики">♡</button></div>
    <p class="market-note">Поиск версии ${esc(p.storage)} · проверь цену и продавца</p>
    <details class="card-details"><summary>обзоры и источник цены</summary><div class="reference-offer"><p class="price-note">${esc(p.priceNote)}</p><a href="${esc(p.store)}" target="_blank" rel="noopener noreferrer">Источник цены-ориентира: ${esc(p.storeName)} ↗</a></div><ul>${links(p)}</ul></details></div></article>`;
  $('#phone-grid').innerHTML = phones.map(card).join('');
  $('#all-sources').innerHTML = phones.map(p=>`<div class="source-group"><h3>${esc(p.title)}</h3><ul>${links(p)}<li><a href="${esc(p.store)}" target="_blank" rel="noopener noreferrer">Предложение магазина: ${esc(p.storeName)} ↗</a></li>${p.imageSource ? `<li><a href="${esc(p.imageSource)}" target="_blank" rel="noopener noreferrer">Источник фотографии ↗</a></li>` : ''}</ul></div>`).join('');
  const batteryData = [
    ['OnePlus 15R','21 ч 36 мин',1296,'https://www.gsmarena.com/oneplus_15r-review-2923p3.php'],
    ['Pixel 10a','15 ч 13 мин',913,'https://www.gsmarena.com/google_pixel_10a-review-2943p3.php'],
    ['Samsung S26 FE','14 ч 49 мин',889,'https://www.gsmarena.com/samsung_galaxy_s26_fe-review-2999p3.php'],
    ['Nothing Phone (3)','12 ч 56 мин',776,'https://www.gsmarena.com/nothing_phone_3-review-2853p3.php']
  ];
  $('#battery-chart').innerHTML = batteryData.map(([name,time,value,url])=>`<div class="battery-row"><div class="battery-row-head"><a href="${url}" target="_blank" rel="noopener noreferrer">${name} ↗</a><span>${time}</span></div><div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${value/1296*100}%"></div></div></div>`).join('');
  const oneplus = phones.find(p=>p.id==='oneplus-15r');
  const samsung = phones.find(p=>p.id==='samsung-s26-fe');
  if(oneplus) $('#hero-oneplus').src=oneplus.image;
  if(samsung) $('#hero-samsung').src=samsung.image;
  const photoViewer = $('#photo-viewer');
  const fullPhoto = $('#photo-full');
  const photoStage = $('#photo-stage');
  const photoZoom = $('#photo-zoom');
  let photoTrigger;
  function setPhotoZoom(zoomed) {
    photoStage.classList.toggle('is-zoomed', zoomed);
    photoZoom.setAttribute('aria-pressed', String(zoomed));
    photoZoom.textContent = zoomed ? 'Вписать в экран' : 'Размер 100%';
    $('#photo-canvas').setAttribute('aria-label', zoomed ? 'Вписать фото в экран' : 'Увеличить фото до оригинального размера');
    photoStage.scrollTo({top:0,left:0,behavior:'auto'});
  }
  function openPhoto(id, trigger) {
    const phone = phones.find(p => p.id === id);
    if (!phone) return;
    photoTrigger = trigger;
    $('#photo-title').textContent = phone.title;
    fullPhoto.alt = phone.title + ' — фотография в полном размере';
    $('#photo-original').href = phone.image;
    $('#photo-source').href = phone.imageSource || phone.store;
    $('#photo-dimensions').textContent = 'Загрузка фотографии…';
    photoZoom.disabled = true;
    fullPhoto.onload = () => {
      fullPhoto.style.setProperty('--photo-width', fullPhoto.naturalWidth + 'px');
      $('#photo-dimensions').textContent = `${fullPhoto.naturalWidth} × ${fullPhoto.naturalHeight} px`;
      photoZoom.disabled = false;
    };
    fullPhoto.onerror = () => { $('#photo-dimensions').textContent = 'Фото не загрузилось. Попробуй открыть оригинал.'; };
    fullPhoto.src = phone.image;
    setPhotoZoom(false);
    photoViewer.showModal();
    document.documentElement.classList.add('photo-open');
  }
  $('#photo-close').addEventListener('click', () => photoViewer.close());
  photoZoom.addEventListener('click', () => setPhotoZoom(!photoStage.classList.contains('is-zoomed')));
  $('#photo-canvas').addEventListener('click', () => {
    if (!photoZoom.disabled) setPhotoZoom(!photoStage.classList.contains('is-zoomed'));
  });
  photoViewer.addEventListener('click', event => { if (event.target === photoViewer) photoViewer.close(); });
  photoViewer.addEventListener('close', () => {
    document.documentElement.classList.remove('photo-open');
    if (photoTrigger?.isConnected) photoTrigger.focus({preventScroll:true});
  });
  function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2400);}
  function updateFavoriteButtons(){document.querySelectorAll('[data-favorite]').forEach(button=>{const id=button.dataset.favorite;const selected=favorites.has(id);const title=phones.find(p=>p.id===id).title;button.setAttribute('aria-pressed',String(selected));button.setAttribute('aria-label',`${selected?'Убрать':'Добавить'} ${title} ${selected?'из любимчиков':'в любимчики'}`);button.textContent=selected?'♥':'♡';});$('#nav-favorite-count').textContent=String(favorites.size);$('#nav-favorites').setAttribute('aria-label',`Показать избранные телефоны: ${favorites.size}`);}
  function updateTable(){const selectedOnly=$('#compare-favorites').checked;const list=selectedOnly?phones.filter(p=>favorites.has(p.id)):phones;$('#comparison-body').innerHTML=list.map(p=>`<tr><th scope="row"><a href="#${esc(p.id)}" data-show-phone="${esc(p.id)}">${esc(p.title)}</a></th><td><span class="cell-price">${rub(p.price)}</span>${esc(p.storage)}</td><td>${esc(p.selfie)}</td><td>${esc(p.battery)}</td><td>${esc(p.shortCompromise)}</td></tr>`).join('');$('#comparison-empty').hidden=list.length>0;$('.table-scroll').hidden=list.length===0;}
  function updateFilters(){let count=0;phones.forEach(p=>{const visible=p.price<=budget&&(filter==='all'||filter==='favorites'&&favorites.has(p.id)||p.scenarios.includes(filter));document.getElementById(p.id).hidden=!visible;if(visible)count++;});document.querySelectorAll('[data-filter]').forEach(button=>{const active=button.dataset.filter===filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});$('#filter-count').textContent=`показано ${count} из ${phones.length}`;$('#reset-filters').hidden=filter==='all'&&budget===50000;$('#empty-state').hidden=count>0;$('#empty-copy').textContent=filter==='favorites'&&favorites.size===0?'Нажми на сердечко у понравившегося телефона — он появится здесь.':'Под эти фильтры ничего не попало. Попробуй другой сценарий или бюджет.';}
  function setFilter(next){filter=next;updateFilters();}
  function showPhones(){$('#phones-title').focus({preventScroll:true});document.getElementById('phones').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
  function resetFilters(){filter='all';budget=50000;$('#budget').value='50000';updateFilters();}
  document.addEventListener('click', event=>{
    const photo=event.target.closest('[data-photo]');
    if(photo){event.preventDefault();openPhoto(photo.dataset.photo,photo);return;}
    const favorite=event.target.closest('[data-favorite]');
    if(favorite){const id=favorite.dataset.favorite;if(favorites.has(id)){favorites.delete(id);toast('Убрали из любимчиков');}else{favorites.add(id);toast('Сохранили в любимчики ♡');}try{localStorage.setItem('phone-diary-favorites-v1',JSON.stringify([...favorites]));}catch{}updateFavoriteButtons();updateTable();updateFilters();if(filter==='favorites'&&!favorites.has(id)){const next=document.querySelector('.phone-card:not([hidden]) [data-favorite]');(next||$('#empty-reset')).focus({preventScroll:true});}return;}
    const chip=event.target.closest('[data-filter]');if(chip){setFilter(chip.dataset.filter);return;}
    const quick=event.target.closest('[data-quick]');if(quick){setFilter(quick.dataset.quick);showPhones();return;}
    const show=event.target.closest('[data-show-phone]');if(show){resetFilters();return;}
    const anchor=event.target.closest('a[href^="#"]');if(anchor){const id=anchor.getAttribute('href').slice(1);const article=document.getElementById(id);if(article?.classList.contains('phone-card')&&article.hidden)resetFilters();}
  });
  $('#budget').addEventListener('change',event=>{budget=Number(event.target.value);updateFilters();});
  $('#reset-filters').addEventListener('click',resetFilters);
  $('#empty-reset').addEventListener('click',resetFilters);
  $('#nav-favorites').addEventListener('click',()=>{setFilter('favorites');showPhones();});
  $('#compare-favorites').addEventListener('change',updateTable);
  updateFavoriteButtons();updateTable();updateFilters();
  let scheduled=false;
  function progress(){scheduled=false;const range=document.documentElement.scrollHeight-innerHeight;$('#progress').style.width=range>0?`${Math.min(100,Math.max(0,scrollY/range*100))}%`:'0%';}
  window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(progress);}},{passive:true});
  window.addEventListener('resize',progress);progress();
  const initialHash=location.hash.slice(1);if(phones.some(p=>p.id===initialHash))requestAnimationFrame(()=>document.getElementById(initialHash).scrollIntoView());
})();
