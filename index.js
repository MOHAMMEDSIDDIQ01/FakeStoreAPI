
fetchProducts();
fetchCategories();

let products = [];

function fetchProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      products = data;
      displayProducts(products);
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
    });
}

function displayProducts(products) {
  const productList = document.querySelector('.product-list');
  productList.innerHTML = '';

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-price">$${product.price}</p>
    `;

    productList.appendChild(productCard);
  });
}

function fetchCategories() {
  fetch('https://fakestoreapi.com/products/categories')
    .then(response => response.json())
    .then(categories => {
      const categoryFilter = document.getElementById('category-filter');
      categories.forEach(category => {
        const option = document.createElement('option');
        option.textContent = category;
        option.value = category;
        categoryFilter.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });

  document.getElementById('category-filter').addEventListener('change', () => {
    const selectedCategory = document.getElementById('category-filter').value;
    const filteredProducts = selectedCategory
      ? products.filter(product => product.category === selectedCategory)
      : products;
    displayProducts(filteredProducts);
  });

  document.getElementById('search').addEventListener('input', () => {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchQuery));
    displayProducts(filteredProducts);
  });

  document.getElementById('sort').addEventListener('change', () => {
    const sortOption = document.getElementById('sort').value;
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOption === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    displayProducts(sortedProducts);
  });
}
