function Product(name, imgURL, numClicks) {
    this.name = name;
    this.imgURL = imgURL;
    this.numClicks = numClicks;
    this.numViews = 0;
}

const tracking = {
    productsArray: [],
    numOfTotalClicks: 0,
    prodAmt: 3,
    roundAmt: 25,
    start: function() {
        if (localStorage.getItem('settings')) {
            const settings = JSON.parse(localStorage.getItem('settings'));
            console.log(settings);
            this.prodAmt = (settings.prodAmt);
            this.roundAmt = (settings.roundAmt);
            console.log(this.prodAmt);
            console.log(this.roundAmt);
        }
        if (localStorage.getItem('product')) {
            const productObjs = JSON.parse(localStorage.getItem('product'));


            for (let i = 0; i < productObjs.length; i++) {
                const currentProduct = productObjs[i];
                const product = new Product(currentProduct.name, currentProduct.imgURL, currentProduct.numClicks);
                this.productsArray.push(product);

            }
        } else {
            this.productsArray.push(
                new Product('R2-D2 Luggage', 'img/bag.jpg', 0),
                new Product('Banana Slicer', 'img/banana.jpg', 0),
                new Product('Bathroom iPad Holder', 'img/bathroom.jpg', 0),
                new Product('Waterproof Converse Boots', 'img/boots.jpg', 0),
                new Product('Instant Breakfast', 'img/breakfast.jpg', 0),
                new Product('Meatball Bubblegum', 'img/bubblegum.jpg', 0),
                new Product('Retro Chair', 'img/chair.jpg', 0),
                new Product('Cthuluhu Figurine', 'img/cthulhu.jpg', 0),
                new Product('Duckbill for Dogs', 'img/dog-duck.jpg', 0),
                new Product('Dragon Meat', 'img/dragon.jpg', 0),
                new Product('Utinsel Adapter for Pens', 'img/pen.jpg', 0),
                new Product('Pet Sweep', 'img/pet-sweep.jpg', 0),
                new Product('Pizza Scissors', 'img/scissors.jpg', 0),
                new Product('Shark Sleeping Bag', 'img/shark.jpg', 0),
                new Product('Baby Sweeper', 'img/sweep.png', 0),
                new Product('Tantaun Sleeping Bag', 'img/tauntaun.jpg', 0),
                new Product('Unicorn Meat', 'img/unicorn.jpg', 0),
                new Product('Tentacle USB Drive', 'img/usb.gif', 0),
                new Product('Infinite Water Can', 'img/water-can.jpg', 0),
                new Product('Death Star Wine Glass', 'img/wine-glass.jpg', 0)
            );
        }
        this.showProduct();
        const board = document.getElementById('game-board');
        board.addEventListener('click', function() {
            const url = event.target.src;
            tracking.numOfTotalClicks++;
            if (tracking.numOfTotalClicks < tracking.roundAmt) {
                for(let i = 0; i < tracking.productsArray.length; i++) {
                    const product = tracking.productsArray[i];
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
        console.log(productClickArray);
        return productClickArray;
    },
    displayChart: function() {
        const chartCanvas = document.getElementById('chart');
        const chartCtx = chartCanvas.getContext('2d');
        const chart = new Chart (chartCtx, { //eslint-disable-line
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
        while (selectedProducts.length < tracking.prodAmt) {
            const randomNum = Math.floor(Math.random() * (this.productsArray.length));
            const randomProduct = this.productsArray[randomNum];
            if (selectedProducts.includes(randomProduct)) continue;
            selectedProducts.push(randomProduct);
            section.appendChild(randomProduct.createTag());
        };

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
