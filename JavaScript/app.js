function Product(name, imgURL) {
    this.name = name;
    this.imgURL = imgURL;
    this.numClicks = 0;
    this.numViews = 0;
}
const tracking = {
    productsArray: [],
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
        let numOfTotalClicks = 0;
        board.addEventListener('click', function() {
            console.log('board was clicked!', event.target);
            const url = event.target.src;
            numOfTotalClicks++;
            if (numOfTotalClicks > 24) {
                alert(`You're out of clicks!`);
                tracking.clearBoard();
                // need to figure out how to stop showProduct
            }
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
