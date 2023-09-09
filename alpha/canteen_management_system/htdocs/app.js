let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let checkOut = document.querySelector('.checkOut');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let totalPriceAll = 0;
let selectedItems = [];

              
openShopping.addEventListener('click', ()=>{
    console.log('open pay');
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    console.log('close pay');
    body.classList.remove('active');
})
checkOut.addEventListener('click', ()=>{
    console.log('ready to pay'+ document.querySelector('.total').innerHTML);
    console.log('ready to pay'+ totalPriceAll);
    
    //body.classList.remove('active');
    let orderDetails = {};
    orderDetails.studentName = 'Abu jose';
    orderDetails.studentEmail = 'abujose888@gmail.com';
    orderDetails.totalPrice = totalPriceAll;
    console.log(JSON.stringify(selectedItems.values()));
    orderDetails.orderItems = selectedItems; 
    console.log(JSON.stringify(orderDetails));
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://abcq2-dev-ed.develop.my.salesforce-sites.com/services/apexrest/newOrder/",true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(orderDetails));
    
})

let products = [
    {
        id: 1,
        name: 'CHICKEN BIRYANI',
        image: 'biryani.png',
        price: 100
    },
    {
        id: 2,
        name: 'CHAPPATHI',
        image: 'cht.png',
        price: 10
    },
    {
        id: 3,
        name: 'CHILLI CHICKEN',
        image: 'cck.png',
        price: 80
    },
    {
        id: 4,
        name: 'MOMOS',
        image: 'momos.png',
        price: 40
    },
    {
        id: 5,
        name: 'PANEER BUTTER MASALA',
        image: 'pbm.jpg',
        price: 70
    },
    {
        id: 6,
        name: 'CHICKEN CUTLET',
        image: 'cutlet.png',
        price: 15
    },
	{
        id: 7,
        name: 'SAMOSA',
        image: 'samoosa.png',
        price: 10
    },
	{
        id: 8,
        name: 'POROTTA',
        image: 'porotta.png',
        price: 10
    },
	{
        id: 9,
        name: 'PARIPPU VADA',
        image: 'pvd.png',
        price: 10
    },
	{
        id: 10,
        name: 'UZHUNNU VADA',
        image: 'uvd.png',
        price: 10
    },
	{
        id: 11,
        name: 'TEA',
        image: 'tea.jpg',
        price: 10
    },
	{
        id: 12,
        name: 'COFFEE',
        image: 'coffee.png',
        price: 15
    },
	{
        id: 13,
        name: 'LIME JUICE',
        image: 'lime.png',
        price: 20
    },
	{
        id: 14,
        name: 'WATERMELON JUICE',
        image: 'wm.png',
        price: 40
    },
	{
        id: 15,
        name: 'PAZHAMPORI',
        image: 'ppp.png',
        price: 15
    },
	{
        id: 16,
        name: 'VEG. MEALS',
        image: 'vm.png',
        price: 60
    }
	
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    let items = {};
   listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    const mapItems = [];
    listCards.forEach((value, key)=>{
        item={};
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
                item.productName = value.name;
                item.quantity = value.quantity;
                item.price = value.price;
                mapItems.push(item);   
                
            }
                 
    })
    console.log('after push'+JSON.stringify(mapItems));
    selectedItems = mapItems;
    total.innerText = 'Pay '+ totalPrice.toLocaleString();
    totalPriceAll = totalPrice.toLocaleString();
    quantity.innerText = count;
    
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        console.log("PAY");
		listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

