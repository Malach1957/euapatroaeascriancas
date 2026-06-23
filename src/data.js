export const CATEGORIES = [
  { key: "all", label: "Todas" },
  { key: "Moda Família", label: "Moda Família" },
  { key: "Moda Infantil", label: "Infantil" },
  { key: "Cama Mesa Banho", label: "Cama Mesa Banho" },
  { key: "Utilidades", label: "Utilidades Dom." },
  { key: "Brinquedos", label: "Brinquedos" },
  { key: "Material Escolar", label: "Mat. Escolar" },
  { key: "Educativos", label: "Educativos" },
  { key: "Ofertas", label: "Ofertas da Semana" },
];

export const CATEGORY_CARDS = [
  { key: "Moda Família", title: "Moda Família", sub: "Looks combinando", img: "https://picsum.photos/id/64/300/200" },
  { key: "Moda Infantil", title: "Moda Infantil", sub: "Conforto e estilo", img: "https://picsum.photos/id/217/300/200" },
  { key: "Cama Mesa Banho", title: "Cama Mesa Banho", sub: "Aconchego em casa", img: "https://picsum.photos/id/116/300/200" },
  { key: "Utilidades", title: "Utilidades Dom.", sub: "Praticidade no lar", img: "https://picsum.photos/id/431/300/200" },
  { key: "Brinquedos", title: "Brinquedos", sub: "Diversão garantida", img: "https://picsum.photos/id/177/300/200" },
  { key: "Material Escolar", title: "Mat. Escolar", sub: "Tudo para estudar", img: "https://picsum.photos/id/42/300/200" },
  { key: "Educativos", title: "Educativos", sub: "Aprender brincando", img: "https://picsum.photos/id/24/300/200" },
  { key: "Ofertas", title: "Ofertas", sub: "Descontos da semana", img: "https://picsum.photos/id/119/300/200" },
];

export const PRODUCTS = [
  { id: 1, name: "Conjunto Família Combinando", category: "Moda Família", price: 149.9, oldPrice: 199.9, badge: "Oferta", image: "https://picsum.photos/id/64/400/300" },
  { id: 2, name: "Vestido Floral Feminino", category: "Moda Família", price: 89.9, oldPrice: 119.9, badge: "Oferta", image: "https://picsum.photos/id/163/400/300" },
  { id: 3, name: "Camiseta Divertida Infantil", category: "Moda Infantil", price: 39.9, badge: "Novo", image: "https://picsum.photos/id/217/400/300" },
  { id: 4, name: "Body Bebê Algodão Premium", category: "Moda Infantil", price: 29.9, oldPrice: 39.9, badge: "Oferta", image: "https://picsum.photos/id/157/400/300" },
  { id: 5, name: "Jogo de Cama Queen Percal", category: "Cama Mesa Banho", price: 179.9, oldPrice: 229.9, badge: "Oferta", image: "https://picsum.photos/id/116/400/300" },
  { id: 6, name: "Jogo de Toalhas 5 peças", category: "Cama Mesa Banho", price: 99.9, oldPrice: 139.9, badge: "Oferta", image: "https://picsum.photos/id/218/400/300" },
  { id: 7, name: "Kit Panelas Antiaderentes", category: "Utilidades", price: 249.9, oldPrice: 319.9, badge: "Oferta", image: "https://picsum.photos/id/431/400/300" },
  { id: 8, name: "Organizador Multiuso Cozinha", category: "Utilidades", price: 59.9, badge: "Novo", image: "https://picsum.photos/id/292/400/300" },
  { id: 9, name: "Ursinho de Pelúcia Aconchegante", category: "Brinquedos", price: 79.9, oldPrice: 99.9, badge: "Oferta", image: "https://picsum.photos/id/177/400/300" },
  { id: 10, name: "Kit Brinquedos Coloridos", category: "Brinquedos", price: 89.9, badge: "Novo", image: "https://picsum.photos/id/136/400/300" },
  { id: 11, name: "Kit Material Escolar Completo", category: "Material Escolar", price: 49.9, oldPrice: 69.9, badge: "Oferta", image: "https://picsum.photos/id/42/400/300" },
  { id: 12, name: "Mochila Escolar Infantil", category: "Material Escolar", price: 119.9, oldPrice: 149.9, badge: "Oferta", image: "https://picsum.photos/id/152/400/300" },
  { id: 13, name: "Lápis de Cor 48 cores", category: "Material Escolar", price: 34.9, badge: "Novo", image: "https://picsum.photos/id/159/400/300" },
  { id: 14, name: "Jogo Educativo Montessori", category: "Educativos", price: 69.9, badge: "Novo", image: "https://picsum.photos/id/24/400/300" },
];

export const formatBRL = (n) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const HERO_IMAGE = "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?w=900";
