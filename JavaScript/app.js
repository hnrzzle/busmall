function Product(name, fileLocation) {
    this.name = name;
    this.fileLocation = fileLocation;
    this.numClicks = 0;
    this.numViews = 0;
}
const tracking = {
    productsArray: [],
    start: function() {
        this.productsArray.push(
            new Product('R2-D2 Luggage', '/img/bag.jpg'),
            new Product('Banana Slicer', '/img/banana.jpg'),
            new Product('Bathroom iPad Holder', '/img/bathroom.jpg'),
            new Product('Waterproof Converse Boots', '/img/boots.jpg'),
            new Product('Instant Breakfast', '/img/breakfast.jpg'),
            new Product('Meatball Bubblegum', '/img/bubblegum.jpg'),
            new Product('Retro Chair', '/img/chair.jpg'),
            new Product('Cthuluhu Figurine', '/img/cthuluh.jpg'),
            new Product('Duckbill for Dogs', '/img/dog-duck.jpg'),
            new Product('Dragon Meat', '/img/dragon.jpg'),
            new Product('Utinsel Adapter for Pens', '/img/pens.jpg'),
            new Product('Pet Sweep', '/img/pet-sweep.jpg'),
            new Product('Pizza Scissors', '/img/scissors.jpg'),
            new Product('Shark Sleeping Bag', '/img/shark.jpg'),
            new Product('Baby Sweeper', '/img/sweep.png'),
            new Product('Tantaun Sleeping Bag', '/img/tantaun.jpg'),
            new Product('Unicorn Meat', '/img/unicorn.jpg'),
            new Product('Tentacle USB Drive', '/img/usb.gif'),
            new Product('Infinite Water Can', '/img/water-can.jpg'),
            new Product('Death Star Wine Glass', '/img/wine-glass.jpg')
        );
        this.showProduct();
    },
    showProduct: function () {

        const selectedProducts = [];
        while (selectedProducts.length < 3) {
            const randomNum = Math.floor(Math.random() * (this.productsArray.length));
            const displayProduct = this.productsArray[randomNum];
            if (selectedProducts.includes(displayProduct)) continue;
            selectedProducts.push(displayProduct);
        };
        console.table(selectedProducts);
    }

};

tracking.start();
