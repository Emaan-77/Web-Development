const express=require('express');
const router=express.Router();

router.post('/addtocart',(req,res)=>{
  let title=req.body.title;
  let genre=req.body.genre; 
  let author = req.body.author;
  let price = req.body.price;

  if(!req.session.cart){
    req.session.cart={items: [],totalPrice:0};
  }

  const item=req.session.cart.items.find(i => i.title === title);
  if (item){
    item.quantity+=1;
  }
  else{
    req.session.cart.items.push({title,genre,author,price:parseFloat(price), quantity:1});

  }

  req.session.cart.totalPrice += parseFloat(price);

  res.json({message:'Item added',cart:req.session.cart})
});

router.post('/removecart', (req, res) => {
    let title = req.body.title;

    if (req.session.cart && req.session.cart.items.length > 0) {
        const itemIndex = req.session.cart.items.findIndex(i => i.title === title);

        if (itemIndex > -1) {
            req.session.cart.totalPrice -= req.session.cart.items[itemIndex].price ;
            if (req.session.cart.items[itemIndex].quantity > 1) {
                req.session.cart.items[itemIndex].quantity -= 1;
            } else {
                req.session.cart.items.splice(itemIndex, 1);
            }
        }
    }

    res.json({ message: 'Item removed', cart: req.session.cart });
});


router.get('/detailscart', (req, res) => {
    const cart = req.session.cart || { items: [], totalPrice: 0 };
    res.json(cart);
});

module.exports = router;

