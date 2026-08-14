// ============================================
// VALEVAREJO DIGITAL - Dados e Lógica Principal
// ============================================

const stores = [
  { id: 1, name: "Cerâmica Vale Europeu", category: "Artesanato", desc: "Peças de cerâmica artesanal feitas à mão com técnicas tradicionais europeias.", location: "Blumenau", products: 24, rating: 4.8, owner: "Maria Silva", whatsapp: "5547999001100" },
  { id: 2, name: "Madeira & Cia", category: "Móveis", desc: "Móveis rústicos e modernos em madeira de reflorestamento.", location: "Brusque", products: 18, rating: 4.6, owner: "João Peters", whatsapp: "5547999002200" },
  { id: 3, name: "Fios do Campo", category: "Têxtil", desc: "Roupas e acessórios tecidos à mão com algodão orgânico.", location: "Indaial", products: 32, rating: 4.9, owner: "Ana Weber", whatsapp: "5547999003300" },
  { id: 4, name: "Gastronomia Colônia", category: "Gastronomia", desc: "Conservas, geleias e temperos típicos da culinária colonial.", location: "Gaspar", products: 15, rating: 4.7, owner: "Hans Müller", whatsapp: "5547999004400" },
  { id: 5, name: "Joias do Vale", category: "Joias", desc: "Joias artesanais em prata e pedras naturais da região.", location: "Itajaí", products: 28, rating: 4.5, owner: "Laura Schmidt", whatsapp: "5547999005500" },
  { id: 6, name: "Papel & Arte", category: "Papelaria", desc: "Papel artesanal, convites personalizados e scrapbooks.", location: "Florianópolis", products: 20, rating: 4.4, owner: "Carlos Becker", whatsapp: "5547999006600" },
  { id: 7, name: "Cervejaria Artesanal Vale", category: "Bebidas", desc: "Cervejas artesanais com ingredientes locais e receitas únicas.", location: "Navegantes", products: 12, rating: 4.8, owner: "Peter Huber", whatsapp: "5547999007700" },
  { id: 8, name: "Jardim Secreto", category: "Plantas", desc: "Plantas suculentas, orquídeas e arranjos naturais.", location: "Timbó", products: 35, rating: 4.3, owner: "Sofia Koehler", whatsapp: "5547999008800" },
];

const products = [
  { id: 1, storeId: 1, name: "Vaso de Cerâmica Pintado à Mão", category: "Artesanato", price: 89.90, oldPrice: 119.90, badge: "Mais Vendido", desc: "Vaso de cerâmica com pintura artesanal, cada peça é única. Ideal para decorar sua casa com identidade do Vale do Itajaí. Medidas: 25cm x 15cm.", emoji: "🏺", stock: 15 },
  { id: 2, storeId: 2, name: "Mesa de Jantar Rústica 6 Lugares", category: "Móveis", price: 1250.00, oldPrice: null, badge: null, desc: "Mesa de jantar em madeira maciça de reflorestamento com acabamento rústico. Capacidade para 6 pessoas. Prazo de entrega: 15 dias úteis.", emoji: "🪑", stock: 3 },
  { id: 3, storeId: 3, name: "Cropped de Algodão Orgânico", category: "Têxtil", price: 79.90, oldPrice: null, badge: "Novidade", desc: "Cropped artesanal em algodão orgânico 100%. Tecido respirável e sustentável. Disponível em várias cores.", emoji: "👚", stock: 25 },
  { id: 4, storeId: 4, name: "Geleia de Morango da Serra", category: "Gastronomia", price: 28.90, oldPrice: 34.90, badge: "Promoção", desc: "Geleia artesanal feita com morangos frescos da serra catarinense. Sem conservantes artificiais. Pote de 350g.", emoji: "🍓", stock: 40 },
  { id: 5, storeId: 5, name: "Colar de Prata com Ametista", category: "Joias", price: 189.90, oldPrice: null, badge: null, desc: "Colar artesanal em prata 925 com ametista natural do sul do Brasil. Corrente mede 45cm.", emoji: "📿", stock: 8 },
  { id: 6, storeId: 6, name: "Kit Papel Artesanal para Escrita", category: "Papelaria", price: 45.00, oldPrice: null, badge: null, desc: "Kit com 10 folhas de papel artesanal + 10 envelopes. Perfeito para cartas e convites especiais.", emoji: "✉️", stock: 30 },
  { id: 7, storeId: 7, name: "Growler 1L - IPA Tropical", category: "Bebidas", price: 35.00, oldPrice: null, badge: "Novidade", desc: "Cerveja IPA Tropical artesanal, refrescante com notas de manga e maracujá. Growler de 1 litro.", emoji: "🍺", stock: 20 },
  { id: 8, storeId: 8, name: "Suculenta em Vaso de Barro", category: "Plantas", price: 32.00, oldPrice: 39.90, badge: "Promoção", desc: "Suculenta plantada em vaso de barro artesanal. Cuidados simples, ideal para ambientes internos.", emoji: "🪴", stock: 45 },
  { id: 9, storeId: 1, name: "Conjunto de Xícaras (4 peças)", category: "Artesanato", price: 129.90, oldPrice: null, badge: null, desc: "Conjunto de 4 xícaras de cerâmica com motivos do Vale do Itajaí. Inclui bandeiira.", emoji: "☕", stock: 12 },
  { id: 10, storeId: 3, name: "Cobertor de Algodão Trançado", category: "Têxtil", price: 220.00, oldPrice: 280.00, badge: "Mais Vendido", desc: "Cobertor artesanal trançado em algodão 100%. Quente e macio, ideal para noites frias do Vale.", emoji: "🧶", stock: 10 },
  { id: 11, storeId: 4, name: "Kit Degustação Colonial", category: "Gastronomia", price: 68.00, oldPrice: null, badge: null, desc: "Kit com 5 potes de conservas coloniais: palmito, milho, feijão, vinagrete e pickles.", emoji: "🫙", stock: 18 },
  { id: 12, storeId: 2, name: "Estante de Parede em Pallet", category: "Móveis", price: 280.00, oldPrice: null, badge: "Novidade", desc: "Estante de parede feita com pallet reaproveitado. 3 prateleiras, ideal para livros e decoração.", emoji: "📚", stock: 7 },
  { id: 13, storeId: 5, name: "Anel com Pérola de Água Doce", category: "Joias", price: 145.00, oldPrice: null, badge: null, desc: "Anel artesanal em prata com pérola de água doce cultivada no sul do Brasil.", emoji: "💍", stock: 6 },
  { id: 14, storeId: 7, name: "Pack 6 Cervejas Artesanais", category: "Bebidas", price: 98.00, oldPrice: 120.00, badge: "Promoção", desc: "Pack com 6 cervejas variadas: Lager, IPA, Wheat, Stout, Pale Ale e Amber.", emoji: "🍻", stock: 15 },
  { id: 15, storeId: 8, name: "Orquídea Phalaenopsis", category: "Plantas", price: 55.00, oldPrice: null, badge: null, desc: "Orquídea Phalaenopsis em vaso cerâmico. Floresce por meses, ideal para presentes.", emoji: "🌸", stock: 22 },
  { id: 16, storeId: 6, name: "Diário Artesanal com Capa de Couro", category: "Papelaria", price: 75.00, oldPrice: null, badge: "Mais Vendido", desc: "Diário com 200 páginas de papel artesanal e capa de couro legítimo. Fechamento com cadarço.", emoji: "📔", stock: 14 },
];

const categories = [
  { name: "Artesanato", icon: "pottery", count: 44, color: "from-amber-500 to-orange-600" },
  { name: "Móveis", icon: "armchair", count: 25, color: "from-amber-700 to-yellow-900" },
  { name: "Têxtil", icon: "shirt", count: 38, color: "from-pink-500 to-rose-600" },
  { name: "Gastronomia", icon: "utensils", count: 30, color: "from-red-500 to-red-700" },
  { name: "Joias", icon: "gem", count: 34, color: "from-purple-500 to-violet-600" },
  { name: "Papelaria", icon: "book-open", count: 22, color: "from-blue-500 to-indigo-600" },
  { name: "Bebidas", icon: "beer", count: 18, color: "from-yellow-600 to-amber-700" },
  { name: "Plantas", icon: "leaf", count: 40, color: "from-emerald-500 to-green-600" },
];

const cities = ["Todos", "Blumenau", "Brusque", "Indaial", "Gaspar", "Itajaí", "Florianópolis", "Navegantes", "Timbó"];

let cart = JSON.parse(localStorage.getItem('valevarejo_cart')) || [];
let user = JSON.parse(localStorage.getItem('valevarejo_user')) || null;
let lojistaProducts = JSON.parse(localStorage.getItem('valevarejo_lojista_products')) || [];

function saveCart() {
  localStorage.setItem('valevarejo_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const product = products.find(p => p.id === productId) || lojistaProducts.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }
  saveCart();
  showToast(`${product.emoji} ${product.name} adicionado ao carrinho!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function updateCartQty(productId, qty) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart();
  }
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  document.querySelectorAll('.cart-badge').forEach(badge => {
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function login(email, password) {
  user = { name: "Cliente ValeVarejo", email, id: Date.now() };
  localStorage.setItem('valevarejo_user', JSON.stringify(user));
  return true;
}

function loginLojista(email, password) {
  user = { name: "Lojista Demo", email, role: "lojista", id: Date.now() };
  localStorage.setItem('valevarejo_user', JSON.stringify(user));
  return true;
}

function register(name, email, password) {
  user = { name, email, id: Date.now() };
  localStorage.setItem('valevarejo_user', JSON.stringify(user));
  return true;
}

function logout() {
  user = null;
  localStorage.removeItem('valevarejo_user');
}

function addLojistaProduct(product) {
  lojistaProducts.push({ ...product, id: Date.now() });
  localStorage.setItem('valevarejo_lojista_products', JSON.stringify(lojistaProducts));
}

function removeLojistaProduct(productId) {
  lojistaProducts = lojistaProducts.filter(p => p.id !== productId);
  localStorage.setItem('valevarejo_lojista_products', JSON.stringify(lojistaProducts));
}

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<div class="bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium"><span class="text-lg">✓</span>${message}</div>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function getStoreName(storeId) {
  const store = stores.find(s => s.id === storeId);
  return store ? store.name : 'Loja Parceira';
}

function getStoreById(storeId) {
  return stores.find(s => s.id === storeId);
}

function getProductsByStore(storeId) {
  return products.filter(p => p.storeId === storeId);
}

function getAllProducts() {
  return [...products, ...lojistaProducts];
}

function searchProducts(query) {
  const q = query.toLowerCase();
  return getAllProducts().filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (getStoreName(p.storeId)).toLowerCase().includes(q)
  );
}

function filterProducts(category, city, priceMin, priceMax) {
  let filtered = getAllProducts();
  if (category && category !== 'Todos') {
    filtered = filtered.filter(p => p.category === category);
  }
  if (city && city !== 'Todos') {
    const cityStoreIds = stores.filter(s => s.location === city).map(s => s.id);
    filtered = filtered.filter(p => cityStoreIds.includes(p.storeId));
  }
  if (priceMin) filtered = filtered.filter(p => p.price >= parseFloat(priceMin));
  if (priceMax) filtered = filtered.filter(p => p.price <= parseFloat(priceMax));
  return filtered;
}

function navigateTo(url) {
  window.location.href = url;
}

function renderProductCard(p, basePath) {
  const base = basePath || '';
  const store = getStoreById(p.storeId);
  return `
    <div class="bg-white rounded-2xl overflow-hidden card-hover cursor-pointer border border-gray-100 shadow-sm" onclick="navigateTo('${base}pages/produto.html?id=${p.id}')">
      <div class="relative h-52 bg-gray-50 flex items-center justify-center text-7xl overflow-hidden">
        ${p.emoji}
        ${p.badge ? `<span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${p.badge === 'Promoção' ? 'bg-red-500' : p.badge === 'Novidade' ? 'bg-blue-500' : 'bg-emerald-500'}">${p.badge}</span>` : ''}
        ${p.oldPrice ? `<span class="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold text-white bg-orange-500">-${Math.round((1 - p.price/p.oldPrice) * 100)}%</span>` : ''}
      </div>
      <div class="p-5">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center"><i data-lucide="store" class="w-3 h-3 text-emerald-700"></i></span>
          <span class="text-xs font-semibold text-emerald-700 truncate">${store ? store.name : ''}</span>
        </div>
        <h3 class="font-bold text-gray-900 mb-1 line-clamp-2 text-sm leading-snug">${p.name}</h3>
        <p class="text-xs text-gray-400 mb-3 flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3"></i> ${store ? store.location : 'Vale do Itajaí'}</p>
        <div class="flex items-end gap-2 mb-4">
          <span class="text-xl font-extrabold text-emerald-700">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="text-sm text-gray-400 line-through">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
        <button class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-all duration-300 active:scale-95" onclick="event.stopPropagation(); addToCart(${p.id})">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `;
}

function renderStoreCard(s, basePath) {
  const base = basePath || '';
  return `
    <div class="bg-white rounded-2xl p-6 card-hover cursor-pointer border border-gray-100 shadow-sm hover:border-emerald-200" onclick="navigateTo('${base}pages/loja.html?id=${s.id}')">
      <div class="flex items-center gap-4 mb-4">
        <div class="w-14 h-14 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xl font-black">${s.name.charAt(0)}</div>
        <div>
          <h3 class="font-bold text-gray-900">${s.name}</h3>
          <span class="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">${s.category}</span>
        </div>
      </div>
      <p class="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">${s.desc}</p>
      <div class="flex items-center gap-4 text-xs text-gray-400">
        <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3"></i> ${s.location}</span>
        <span class="flex items-center gap-1"><i data-lucide="package" class="w-3 h-3"></i> ${s.products} produtos</span>
        <span class="flex items-center gap-1"><i data-lucide="star" class="w-3 h-3"></i> ${s.rating}</span>
      </div>
    </div>
  `;
}

function headerHTML(activePage, basePath) {
  const base = basePath || '';
  return `
    <header class="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div class="flex items-center gap-6">
          <a href="${base}index.html" class="flex items-center gap-2.5 shrink-0">
            <div class="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-sm">VV</div>
            <span class="text-xl font-extrabold text-gray-900 hidden sm:block">Vale<span class="text-emerald-600">Varejo</span></span>
          </a>
          <div class="flex-1 hidden md:flex">
            <input type="text" id="searchInput" placeholder="Buscar produtos, lojas, categorias..." class="w-full px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-l-xl text-sm focus:bg-white focus:border-emerald-500 transition-all" onkeypress="if(event.key==='Enter')doSearch()">
            <button onclick="doSearch()" class="px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-r-xl font-semibold text-sm transition-all">Buscar</button>
          </div>
          <div class="flex items-center gap-1 sm:gap-3 ml-auto">
            <a href="${base}pages/login.html" class="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all text-gray-600 hover:text-emerald-600">
              <i data-lucide="user" class="w-5 h-5"></i>
              <span class="text-[10px] font-medium">Entrar</span>
            </a>
            <a href="${base}pages/carrinho.html" class="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all text-gray-600 hover:text-emerald-600 relative">
              <i data-lucide="shopping-cart" class="w-5 h-5"></i>
              <span class="text-[10px] font-medium">Carrinho</span>
              <span class="cart-badge absolute -top-0.5 -right-0.5 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full items-center justify-center hidden">0</span>
            </a>
            <a href="${base}pages/dashboard.html" class="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all text-gray-600 hover:text-emerald-600">
              <i data-lucide="store" class="w-5 h-5"></i>
              <span class="text-[10px] font-medium">Lojista</span>
            </a>
          </div>
        </div>
      </div>
      <nav class="bg-white border-t border-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div class="flex gap-0 overflow-x-auto text-sm font-medium">
            <a href="${base}index.html" class="px-4 py-3 whitespace-nowrap border-b-2 ${activePage === 'home' ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50' : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'} transition-all">Início</a>
            <a href="${base}pages/catalogo.html" class="px-4 py-3 whitespace-nowrap border-b-2 ${activePage === 'catalogo' ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50' : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'} transition-all">Catálogo</a>
            <a href="${base}pages/lojas.html" class="px-4 py-3 whitespace-nowrap border-b-2 ${activePage === 'lojas' ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50' : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'} transition-all">Lojas</a>
            <a href="${base}pages/catalogo.html?cat=Artesanato" class="px-4 py-3 whitespace-nowrap border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all">Artesanato</a>
            <a href="${base}pages/catalogo.html?cat=Móveis" class="px-4 py-3 whitespace-nowrap border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all">Móveis</a>
            <a href="${base}pages/catalogo.html?cat=Gastronomia" class="px-4 py-3 whitespace-nowrap border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all">Gastronomia</a>
            <a href="${base}pages/catalogo.html?cat=Joias" class="px-4 py-3 whitespace-nowrap border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all">Joias</a>
            <a href="${base}pages/catalogo.html?cat=Bebidas" class="px-4 py-3 whitespace-nowrap border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all">Bebidas</a>
          </div>
        </div>
      </nav>
    </header>
  `;
}

function footerHTML(basePath) {
  const base = basePath || '';
  return `
    <footer class="bg-gray-900 text-gray-400 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-xs">VV</div>
              <span class="text-lg font-extrabold text-white">ValeVarejo</span>
            </div>
            <p class="text-sm leading-relaxed">Conectando produtores artesanais do Vale do Itajaí a clientes que valorizam produtos únicos, feitos com história e qualidade.</p>
          </div>
          <div>
            <h4 class="text-white font-bold mb-4">Links Úteis</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="${base}pages/catalogo.html" class="hover:text-emerald-400 transition-colors">Catálogo</a></li>
              <li><a href="${base}pages/lojas.html" class="hover:text-emerald-400 transition-colors">Lojas Parceiras</a></li>
              <li><a href="${base}pages/dashboard.html" class="hover:text-emerald-400 transition-colors">Área do Lojista</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-bold mb-4">Categorias</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="${base}pages/catalogo.html?cat=Artesanato" class="hover:text-emerald-400 transition-colors">Artesanato</a></li>
              <li><a href="${base}pages/catalogo.html?cat=Móveis" class="hover:text-emerald-400 transition-colors">Móveis</a></li>
              <li><a href="${base}pages/catalogo.html?cat=Gastronomia" class="hover:text-emerald-400 transition-colors">Gastronomia</a></li>
              <li><a href="${base}pages/catalogo.html?cat=Joias" class="hover:text-emerald-400 transition-colors">Joias</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-bold mb-4">Contato</h4>
            <ul class="space-y-2 text-sm">
              <li>contato@valevarejo.com.br</li>
              <li>(47) 3039-0000</li>
              <li>Blumenau, SC</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>&copy; 2026 ValeVarejo Digital. Todos os direitos reservados. Turma 304 — Projeto BPMN.</p>
        </div>
      </div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
});
