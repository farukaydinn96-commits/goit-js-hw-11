import{S as m,i as a}from"./assets/vendor-B2mb6eXk.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const l=document.querySelector("#search-form"),u=document.querySelector(".gallery"),c=document.querySelector(".loader"),d="56419387-b9216e8761a1aa448b5b4bea2";let y=new m(".gallery a",{captionsData:"alt",captionDelay:250});l.addEventListener("submit",s=>{s.preventDefault();const o=s.currentTarget.elements.searchQuery.value.trim();if(o==="")return;u.innerHTML="",c.style.display="block";const n=`https://pixabay.com/api/?key=${d}&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true`;fetch(n).then(r=>{if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return r.json()}).then(r=>{if(r.hits.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff"});return}g(r.hits),y.refresh()}).catch(r=>{a.error({title:"Error",message:"Something went wrong while fetching data. Please try again later.",position:"topRight"}),console.error("Fetch error:",r)}).finally(()=>{c.style.display="none",l.reset()})});function g(s){const o=s.map(({webformatURL:n,largeImageURL:r,tags:e,likes:t,views:i,comments:f,downloads:p})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${r}">
  <img class="gallery-image" src="${n}" alt="${e}" />
</a>
      <div class="info">
        <p class="info-item"><b>Likes</b><span>${t}</span></p>
        <p class="info-item"><b>Views</b><span>${i}</span></p>
        <p class="info-item"><b>Comments</b><span>${f}</span></p>
        <p class="info-item"><b>Downloads</b><span>${p}</span></p>
      </div>
    </li>
  `).join("");u.innerHTML=o}
//# sourceMappingURL=index.js.map
