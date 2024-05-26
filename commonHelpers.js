import{a as d,S as y,i as m}from"./assets/vendor-b0d10f48.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function a(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(o){if(o.ep)return;o.ep=!0;const r=a(o);fetch(o.href,r)}})();d.defaults.baseURL="https://pixabay.com/api/";const _=async(e,s=1,a=15)=>{const t={key:"44082104-13032bddabedf7f071f678933",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s};return await d.get("",{params:t})},l=document.querySelector(".images"),p=document.querySelector("#loader_place"),u=document.querySelector("#load_more_form"),L=new y(".images li a",{captionDelay:250,captionsData:"alt"}),b=()=>{p.innerHTML='<span class="loader"></span>'},v=()=>{p.innerHTML=""},S=()=>{u.classList.remove("visually-hidden")},w=()=>{u.classList.add("visually-hidden")},q=()=>{m.info({message:"We're sorry, but you've reached the end of search results!",position:"topRight"})},x=()=>{const e=document.querySelector(".image");if(e){const s=e.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}},M=(e,s=!0)=>{if(s&&(l.innerHTML=""),e.hits.length===0)m.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight"});else{const a=e.hits.map(t=>`<li class="image">
          <a href="${t.largeImageURL}"><img src="${t.webformatURL}" alt="${t.tags}"></a>
          <ul class="info">
            <li class="info-block">
              <p3>Likes</p3>
              <span>${t.likes}</span>
            </li>
            <li class="info-block">
              <p3>Views</p3>
              <span>${t.views}</span>
            </li>
            <li class="info-block">
              <p3>Comments</p3>
              <span>${t.comments}</span>
            </li>
            <li class="info-block">
              <p3>Downloads</p3>
              <span>${t.downloads}</span>
            </li>
          </ul>
        </li>`).join("");l.innerHTML+=a,L.refresh()}},f=document.querySelector("#search-form"),$=document.querySelector("#load_more_form"),c=15;let i=1,g="";const h=(e=!0)=>{w(),b(),_(g,i,c).then(s=>{const a=i*c,t=s.data;v(),M(t,e),t.hits.length>0&&t.totalHits>0&&(a<t.totalHits?S():q(),e&&(f.text.value="")),e||x()})},H=e=>{e.preventDefault(),e.target.text.value.trim().length>0&&(i=1,g=e.target.text.value.trim(),h())},O=e=>{i++,e.preventDefault(),h(!1)};f.addEventListener("submit",H);$.addEventListener("submit",O);
//# sourceMappingURL=commonHelpers.js.map
