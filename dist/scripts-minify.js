let i=0,pokemonRepository=function(){let e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=150";function n(t){if("object"!=typeof t||Array.isArray(t)||null===t)console.log("Please add an object value");else{let i=["name","detailsUrl"],r=Object.keys(t);n=r,o=i,Array.isArray(n)&&Array.isArray(o)&&n.length===o.length&&n.every((e,t)=>e===o[t])?"string"==typeof t.name&&"string"==typeof t.detailsUrl?(e.push(t),console.log("Success")):console.log('Please make sure date types are as follows "Name":String, "type":array, "height":int'):console.log('Please use appropriate keys being "Name(string)", "Type(array)", "Height(int)"')}var n,o}function o(){let e=document.querySelector(".loading-message");e.parentElement.removeChild(e)}function i(e){let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=t.types}).catch(function(e){console.error(e)})}return window.addEventListener("keydown",e=>{let t=document.querySelector("#modal-container");"Escape"===e.key&&t.classList.contains("is-visible")&&document.querySelector("#modal-container").classList.remove("is-visible")}),{add:n,getAll:function(){return e},search:function(t){var n=e.filter(function(e){return e.name==t});return console.log(n)},addListItem:function(e){let t=document.querySelector(".list-group"),n=document.createElement("li"),o=document.createElement("button"),r=document.createElement("div");o.innerText=e.name,r.classList.add("d-grid"),r.classList.add("gap-2"),o.classList.add("btn"),o.classList.add("btn-light"),n.classList.add("list-group-item"),o.setAttribute("id","show-modal"),o.setAttribute("type","button"),o.setAttribute("data-toggle","modal"),o.setAttribute("data-target","#modal-container"),o.addEventListener("click",function(t){var n;i(n=e).then(function(){!function(e,t,n){document.querySelector("#modal-title").innerText=t;let o=document.querySelector("#modal-body");o.innerText=n;let i=document.createElement("img");i.src=e,o.appendChild(i),$("#modal-container").modal("show")}(n.imageUrl,"Name: "+n.name,"Height: "+n.height)})}),r.appendChild(o),n.appendChild(r),t.appendChild(n)},loadList:function(){return function(){let e=document.createElement("div"),t=document.createTextNode("Loading");e.classList.add("loading-message"),e.appendChild(t),ul=document.querySelector(".pokemon-list"),document.body.insertBefore(e,ul)}(),fetch(t).then(function(e){return e.json()}).then(function(e){o(),e.results.forEach(function(e){let t={name:e.name,detailsUrl:e.url};n(t),console.log(t)})}).catch(function(e){o(),console.error(e)})},loadDetails:i}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});