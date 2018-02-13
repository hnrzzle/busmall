function Product(name, imgURL) {
    this.name = name;
    this.imgURL = imgURL;
    this.numClicks = 0;
    this.numViews = 0;
}
const tracking = {
    productsArray: [],
    numOfTotalClicks: 0,
    start: function() {
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
                alert('You\'re out of clicks!');
                tracking.clearBoard();
                board.removeEventListener('click', event.target);
                tracking.displayChart();
                // tracking.displayList();

            }

        });

    },

    productNames: function() {
        let productNameArray = [];
        for (let i = 0; i < this.productsArray.length; i++) {
            productNameArray.push(this.productsArray[i].name);
        }
        return productNameArray;
    },
    
    productClicks: function() {
        let productClickArray = [];
        for (let i = 0; i < this.productsArray.length; i++) {
            productClickArray.push(this.productsArray[i].numClicks);
        }
        return productClickArray;
    },

    displayChart: function() {
        const chartCanvas = document.getElementById('chart');
        const chartCtx = chartCanvas.getContext('2d');
        const chart = new Chart (chartCtx, {
            type: 'bar',
            data: {
                labels: this.productNames(),
                datasets: [{
                    label: '# of Votes',
                    data: this.productClicks(),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
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



    // displayList: function () {
    //     for (let i = 0; i < this.productsArray.length; i++) {
    //         const list = document.getElementById('list-count');
    //         const li = document.createElement('li');
    //         li.textContent = this.productsArray[i].name + ' was clicked ' + this.productsArray[i].numClicks + ' times!';
    //         list.appendChild(li);
    //     }

    // },
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
