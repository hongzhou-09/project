// ====== 产品数据（示例） ======
const products = [
  {
    id: 'p1',
    name: 'Elvra t-shirt',
    category: 'tshirts',
    price: 99,
    colors: [
     { name: 'BLACK', code:'#000', image:'./img/Product/t-shirt.png', thumb:'./img/Product/t-shirt.png' },
     { name: 'WHITE', code:'#FFFFFF', image:'./img/Product/t-shirt white.png', thumb:'./img/Product/t-shirt white.png' },
    ],
    sizes: ['S','M','L','XL'],
    featured: true
  },
  {
    id: 'p2',
    name: 'Elvra Heavy Hoodie',
    category: 'hoodies',
    price: 149,
    colors: [
      { name: 'ARMY GREEN', code:'#55857C', image:'./img/Product/hoodies.png', thumb:'./img/Product/hoodies.png' },
      { name: 'WHITE', code:'#FFFFFF', image:'./img/Product/hoodies white.png', thumb:'./img/Product/hoodies white.png' },
    ],
    sizes: ['S','M','L','XL'],
    featured: true
  },
  {
    id: 'p3',
    name: 'Elvra Pants',
    category: 'pants',
    price: 199,
    colors: [
      { name: 'BLACK', code:'#000', image:'./img/Product/pants.png', thumb:'./img/Product/pants.png' },
      { name: 'WHITE', code:'#FFFFFF', image:'./img/Product/pants white.png', thumb:'./img/Product/pants white.png' }
    ],
    sizes: ['S','M','L'],
    featured: true
  },
  {
    id: 'p4',
    name: 'Elvra Cap',
    category: 'accessories',
    price: 49,
    colors: [
      { name: 'KHAKI', code:'#b3aa70', image:'./img/Product/hat.png', thumb:'./img/Product/hat.png' },
      { name: 'BLUE', code:'#030c42', image:'./img/Product/hat blue (2).png', thumb:'./img/Product/hat blue (2).png' }
    ],
    sizes: ['FREE SIZE'],
    featured: true
  },
      {
      id: 'p5',
      name: 'Elvra Shoe',
      category: 'Shoes',
      price: 129,
      colors: [
        { name: 'WHITE', code:'#FFFFFF', image:'./img/Product/shoe.png', thumb:'./img/Product/shoe.png' },
        { name: 'WHITE', code:'#FFFFFF', image:'./img/Product/shoe1.png', thumb:'./img/Product/shoe1.png' }
      ],
      sizes: ['40', '41', '42', '43', '44'],
      featured: true
    },
];

// categories order
const categories = [
  {id:'tshirts', title:'T-Shirts'},
  {id:'hoodies', title:'Hoodies'},
  {id:'pants', title:'Pants'},
  {id:'shoes', title:'Shoes'},
  {id:'accessories', title:'Accessories'}
];

// ====== 渲染功能 ======
const carouselTrack = document.getElementById('carouselTrack');
const featured = products.filter(p=>p.featured);
featured.forEach(p=>{
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${p.colors[0].thumb}" alt="${p.name}" data-id="${p.id}">
    <h4>${p.name}</h4>
    <div class="meta">
      <div>RM ${p.price.toFixed(2)}</div>
      <button data-id="${p.id}" class="openDetail" style="padding:6px 8px;border-radius:8px;border:1px solid #ddd; background:transparent; cursor:pointer">查看</button>
    </div>
  `;
  carouselTrack.appendChild(card);
});

// carousel controls
let pos = 0;
const cardWidth = 280; // approx including gap
document.getElementById('prevBtn').addEventListener('click', ()=> {
  pos = Math.min(pos + cardWidth*2, 0);
  carouselTrack.style.transform = `translateX(${pos}px)`;
});
document.getElementById('nextBtn').addEventListener('click', ()=> {
  const max = -Math.max(0, (carouselTrack.childElementCount * (cardWidth) - (document.querySelector('.carousel').clientWidth - 40)));
  pos = Math.max(pos - cardWidth*2, max);
  carouselTrack.style.transform = `translateX(${pos}px)`;
});

// render categories and product grids
const productsSection = document.getElementById('products');
categories.forEach(cat=>{
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `<div class="category-title"><h2 id="${cat.id}" style="margin:0">${cat.title}</h2></div>`;
  const grid = document.createElement('div');
  grid.className = 'product-grid';
  products.filter(p=>p.category===cat.id).forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.name = p.name.toLowerCase();
    card.dataset.category = p.category;
    card.innerHTML = `
      <img src="${p.colors[0].thumb}" alt="${p.name}" data-id="${p.id}">
      <h4>${p.name}</h4>
      <div class="meta">
        <div>RM ${p.price.toFixed(2)}</div>
        <button data-id="${p.id}" class="openDetail" style="padding:6px 8px;border-radius:8px;border:1px solid #ddd; background:transparent; cursor:pointer">查看 / 购买</button>
      </div>
    `;
    grid.appendChild(card);
  });
  wrapper.appendChild(grid);
  productsSection.appendChild(wrapper);
});

// ====== 菜单、搜索、品牌跳回顶部 ======
const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
menuBtn.addEventListener('click', ()=> menuPanel.classList.toggle('show'));
// 点击菜单项关闭并滚动到对应分类
menuPanel.querySelectorAll('a[data-target]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const id = a.dataset.target;
    menuPanel.classList.remove('show');
    document.getElementById(id).scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// brand -> 回到顶部
document.getElementById('brandBtn').addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// 搜索
const searchToggle = document.getElementById('searchToggle');
const searchInput = document.getElementById('searchInput');
searchToggle.addEventListener('click', ()=> {
  searchInput.classList.toggle('visible');
  if(searchInput.classList.contains('visible')) searchInput.focus();
  else searchInput.value='';
});
searchInput.addEventListener('input', ()=> {
  const q = searchInput.value.trim().toLowerCase();
  document.querySelectorAll('.product-grid .card').forEach(card=>{
    const name = card.dataset.name || '';
    card.style.display = name.includes(q) ? 'block' : 'none';
  });
});

// open product detail (delegation)
document.body.addEventListener('click', (e)=>{
  const btn = e.target.closest('.openDetail');
  if(btn){
    const id = btn.dataset.id;
    openProductModal(id);
  }
});

// ====== Product Modal logic ======
const productModalBackdrop = document.getElementById('productModalBackdrop');
const pmLeft = document.getElementById('pmLeft');
const pmMainImg = document.getElementById('pmMainImg');
const pmTitle = document.getElementById('pmTitle');
const pmPrice = document.getElementById('pmPrice');
const colorList = document.getElementById('colorList');
const sizeList = document
