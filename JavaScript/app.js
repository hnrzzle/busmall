function Product(name, imgURL, numClicks) {
    this.name = name;
    this.imgURL = imgURL;
    this.numClicks = numClicks;
    this.numViews = 0;
}
const tracking = {
    productsArray: [],
    numOfTotalClicks: 0,
    start: function() {
        if (localStorage.getItem('product')) {
            const productObjs = JSON.parse(localStorage.getItem('product'));
            console.log(productObjs);


            for (let i = 0; i < productObjs.length; i++) {
                const currentProduct = productObjs[i];
                const product = new Product(currentProduct.name, currentProduct.imgURL, currentProduct.numClicks);
                this.productsArray.push(product);

            }
        } else {
            this.productsArray.push(
                new Product('R2-D2 Luggage', 'img/bag.jpg'),
                new Product('Banana Slicer', 'img/banana.jpg'),
                new Product('Bathroom iPad Holder', 'img/bathroom.jpg'),
                new Product('Waterproof Converse Boots', 'img/boots.jpg'),
                new Product('Instant Breakfast', 'img/breakfast.jpg'),
                new Product('Meatball Bubblegum', 'img/bubblegum.jpg'),
                new Product('Retro Chair', 'img/chair.jpg'),
                new Product('Cthuluhu Figurine', 'img/cthulhu.jpg'),
                new Product('Duckbill for Dogs', 'img/dog-duck.jpg'),
                new Product('Dragon Meat', 'img/dragon.jpg'),
                new Product('Utinsel Adapter for Pens', 'img/pen.jpg'),
                new Product('Pet Sweep', 'img/pet-sweep.jpg'),
                new Product('Pizza Scissors', 'img/scissors.jpg'),
                new Product('Shark Sleeping Bag', 'img/shark.jpg'),
                new Product('Baby Sweeper', 'img/sweep.png'),
                new Product('Tantaun Sleeping Bag', 'img/tauntaun.jpg'),
                new Product('Unicorn Meat', 'img/unicorn.jpg'),
                new Product('Tentacle USB Drive', 'img/usb.gif'),
                new Product('Infinite Water Can', 'img/water-can.jpg'),
                new Product('Death Star Wine Glass', 'img/wine-glass.jpg')
            );
        }
        this.showProduct();
        const board = document.getElementById('game-board');
        board.addEventListener('click', function() {
            console.log('board was clicked!', event.target);
            const url = event.target.src;
            tracking.numOfTotalClicks++;
            if (tracking.numOfTotalClicks < 25) {
                for(let i = 0; i < tracking.productsArray.length; i++) {
                    const product = tracking.productsArray[i];
                    console.log(url.slice(url.indexOf(product.imgURL), url.length));
                    const endOfUrl = url.slice(url.indexOf(product.imgURL), url.length);
                    if (endOfUrl === product.imgURL) {
                        product.numClicks++;
                        console.log(product);
                    }
                }
                tracking.clearBoard();
                tracking.showProduct();
            } else {
                tracking.clearBoard();
                tracking.finishText();
                board.removeEventListener('click', event.target);
                tracking.displayChart();
                localStorage.setItem('product', JSON.stringify(tracking.productsArray));

            }

        });

    },
    finishText: function () {
        const board = document.getElementById('game-board');
        const h1 = document.createElement('h1');
        h1.textContent = 'Your results are displayed below, thanks for playing :)';
        board.appendChild(h1);

    },
    productNames: function() {
        const productNameArray = [];
        for (let i = 0; i < this.productsArray.length; i++) {
            productNameArray.push(this.productsArray[i].name);
        }
        return productNameArray;
    },
    productClicks: function() {
        const productClickArray = [];
        for (let i = 0; i < this.productsArray.length; i++) {
            productClickArray.push(this.productsArray[i].numClicks);
        }
        return productClickArray;
    },
    displayChart: function() {
        const chartCanvas = document.getElementById('chart');
        const chartCtx = chartCanvas.getContext('2d');
        new Chart (chartCtx, { 
            type: 'horizontalBar',
            data: {
                labels: this.productNames(),
                datasets: [{
                    label: '# of Votes',
                    data: this.productClicks(),
                    backgroundColor: ('white'),
                    borderColor: [
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    },
    showProduct: function () {
        const section = document.getElementById('game-board');
        const selectedProducts = [];
        while (selectedProducts.length < 3) {
            const randomNum = Math.floor(Math.random() * (this.productsArray.length));
            const randomProduct = this.productsArray[randomNum];
            if (selectedProducts.includes(randomProduct)) continue;
            selectedProducts.push(randomProduct);
            console.log(randomProduct.createTag());
            section.appendChild(randomProduct.createTag());
        };
        console.table(selectedProducts);
    },
    clearBoard: function () {
        const section = document.getElementById('game-board');
        section.innerHTML = '';
    }

};


Product.prototype.createTag = function () {
    const element = document.createElement('img');
    element.src = this.imgURL;
    element.setAttribute('alt', this.name);
    return element;
};

tracking.start();
