// Simple gallery grid script
// Populates the #gallery-grid element, provides filtering, search, and favorite toggling.

(function(){
	const DATA = [
		{id: '1', title: 'Panna Cotta', category: 'food', src: '../images/pinna.webp'},
		{id: '2', title: 'Tiramisu', category: 'food', src: '../images/tiramisu.webp'},
		{id: '3', title: 'Chef John Doe', category: 'people', src: '../images/hubert-keller-chefs-photo-1.jpg'},
		{id: '4', title: 'Dining Room', category: 'interior', src: '../images/heroimagemenu.jpg'},
		{id: '5', title: 'Chicken Parmigiana', category: 'food', src: '../images/Chicken-parmigiana-pollo-a-la-parmesana-1536x1022.jpg'},
		{id: '6', title: 'Chef Jane Smith', category: 'people', src: '../images/female chef.webp'},
		{id: '7', title: 'Cozy Corner', category: 'interior', src: '../images/OIP.webp'}
	];

	const STORAGE_KEY = 'galleryFavorites-v1';
	const grid = document.getElementById('gallery-grid');
	const searchInput = document.getElementById('gallery-search');
	const filterButtons = Array.from(document.querySelectorAll('.filters button'));

	let favorites = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
	let activeFilter = 'all';
	let searchTerm = '';

	function saveFavorites(){
		localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)));
	}

	function buildItem(item){
		const el = document.createElement('article');
		el.className = 'grid-item';
		el.dataset.id = item.id;
		el.dataset.category = item.category;

		if(favorites.has(item.id)) el.classList.add('favorite');

		el.innerHTML = `
			<img src="${item.src}" alt="${escapeHtml(item.title)}">
			<button class="fav-btn" aria-pressed="${favorites.has(item.id)}" title="Toggle favorite" data-id="${item.id}">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
			</button>
			<div class="meta"><h3>${escapeHtml(item.title)}</h3><p class="category">${escapeHtml(capitalize(item.category))}</p></div>
		`;

		const favBtn = el.querySelector('.fav-btn');
		favBtn.addEventListener('click', (e)=>{
			const id = e.currentTarget.dataset.id;
			if(favorites.has(id)) favorites.delete(id); else favorites.add(id);
			el.classList.toggle('favorite');
			favBtn.setAttribute('aria-pressed', favorites.has(id));
			saveFavorites();
		});

		return el;
	}

	function render(){
		if(!grid) return;
		grid.innerHTML = '';
		const list = DATA.filter(i=>{
			if(activeFilter !== 'all' && i.category !== activeFilter) return false;
			if(searchTerm && !i.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
			return true;
		});

		if(list.length === 0){
			const p = document.createElement('p');
			p.textContent = 'No items found.';
			grid.appendChild(p);
			return;
		}

		const frag = document.createDocumentFragment();
		list.forEach(item=>frag.appendChild(buildItem(item)));
		grid.appendChild(frag);
	}

	function setFilter(filter){
		activeFilter = filter;
		filterButtons.forEach(b=>b.classList.toggle('active', b.dataset.filter===filter));
		render();
	}

	function escapeHtml(s){
		return String(s).replace(/[&<>"']/g, function(c){
			return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c];
		});
	}

	function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1)}

	// wire up filters
	filterButtons.forEach(btn=>{
		btn.addEventListener('click', ()=> setFilter(btn.dataset.filter));
	});

	// search debounce
	let debounceTimer = null;
	if(searchInput){
		searchInput.addEventListener('input', (e)=>{
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(()=>{
				searchTerm = e.target.value.trim();
				render();
			}, 180);
		});
	}

	// initial render
	document.addEventListener('DOMContentLoaded', ()=>{
		// ensure buttons array is current in case script loaded before DOM
		render();
	});

})();


