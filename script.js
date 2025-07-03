const items = [{
        title: "PUSY fix brow gel",
        description: "Гель для бровей",
        tags: ["brows", "lashes"],
        price: 29.76,
        img: "./img/3.JPEG",
        rating: 5.0,
    },
    {
        title: "PUSY brow fix gel",
        description: "Гель-фиксатор для бровей",
        tags: ["brows", "lashes"],
        price: 24.93,
        img: "./img/4.JPEG",
        rating: 4.7,
    },
    {
        title: "PUSY face box",
        description: "Набор для лица",
        tags: ["face"],
        price: 76.25,
        img: "./img/5.JPEG",
        rating: 4.9,
    },
    {
        title: "PUSY hialuronic body cream",
        description: "Гиалуроновый крем-гель для тела",
        tags: ["body"],
        price: 33.09,
        img: "./img/6.JPEG",
        rating: 3.2,
    },
    {
        title: "PUSY face foam",
        description: "Пенка для умывания",
        tags: ["face"],
        price: 39.76,
        img: "./img/7.JPEG",
        rating: 2.9,
    },
    {
        title: "PUSY brow grow booster",
        description: "Сыворотка для роста бровей",
        tags: ["brows", "lashes"],
        price: 42.61,
        img: "./img/8.JPEG",
        rating: 3.4,
    },
    {
        title: "PUSY lip liqid glaze",
        description: "Блеск для губ",
        tags: ["lips"],
        price: 31.25,
        img: "./img/9.JPEG",
        rating: 4.8,
    },
    {
        title: "PUSY makeup remover",
        description: "Двухфазное средство для снятия макияжа",
        tags: ["face"],
        price: 27.41,
        img: "./img/10.JPEG",
        rating: 3.2,
    },
    {
        title: "PUSY shower body oil",
        description: "Масло для душа",
        tags: ["body"],
        price: 39.29,
        img: "./img/11.JPEG",
        rating: 3.7,
    },
    {
        title: "PUSY beauty assistant",
        description: "Набор для бровей, лица и губ",
        tags: ["brow", "face", "lips"],
        price: 57.89,
        img: "./img/12.JPEG",
        rating: 4.1
    }
];



const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const shopItemsContainer = document.getElementById('shop-items');
const nothingFoundEl = document.getElementById('nothing-found');
const sortSelect = document.getElementById('sort');

let currentItems = [...items];

function sortItems(itemsArray, criterion) {
    switch (criterion) {
        case 'alphabet':
            return [...itemsArray].sort((a, b) => a.title.localeCompare(b.title));
        case 'expensive':
            return [...itemsArray].sort((a, b) => b.price - a.price);
        case 'cheap':
            return [...itemsArray].sort((a, b) => a.price - b.price);
        case 'rating':
            return [...itemsArray].sort((a, b) => b.rating - a.rating);
        default:
            return itemsArray;
    }
}

function renderItems(itemsToRender) {
    shopItemsContainer.innerHTML = '';

    if (itemsToRender.length === 0) {
        nothingFoundEl.innerHTML = 'Ничего не найдено';
        return;
    } else {
        nothingFoundEl.innerHTML = '';
    }

    itemsToRender.forEach(item => {
        const template = document.getElementById('item-template');
        const clone = template.content.cloneNode(true);

        clone.querySelector('img').src = item.img;
        clone.querySelector('h1').textContent = item.title;
        clone.querySelector('p').textContent = item.description;

        const tagsContainer = clone.querySelector('.tags');
        tagsContainer.innerHTML = '';
        item.tags.forEach(tag => {
            const tagEl = document.createElement('div');
            tagEl.className = 'tag';
            tagEl.textContent = tag;
            tagsContainer.appendChild(tagEl);
        });

        clone.querySelector('.price').textContent =
            `$${item.price.toFixed(2)}`;

        clone.querySelector('.rating').textContent =
            `⭐ ${item.rating}`;

        shopItemsContainer.appendChild(clone);
    });
}


window.addEventListener('load', () => {
    currentItems = [...items];

    currentItems = sortItems(currentItems, sortSelect.value);
    renderItems(currentItems);
});

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query === '') {

        currentItems = [...items];
    } else {
        currentItems = items.filter(item => item.title.toLowerCase().includes(query));
    }

    currentItems = sortItems(currentItems, sortSelect.value);

    renderItems(currentItems);
});

sortSelect.addEventListener('change', () => {
    currentItems = sortItems(currentItems, sortSelect.value);
    renderItems(currentItems);
});