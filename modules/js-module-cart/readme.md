## js-module-cart

This module helps you to scaffold transactional computation like add to cart.

version 1.0.0

--------
Usage

require this module to your code

```
import cartModule from 'js-module-cart'

```

--------

inCart (id)
this will check if an item is in cart or not

params
```
param: id
desc: id of item
type: number
required: true
format: _
example: 1
```

docs
```
const result = cartModule.inCart(12)
```

--------

getCartPos(id)
get item location on current cart. If item not found, it will return a negative index number.

params
```
param: id
desc: id of item
type: number
required: true
format: _
example: 1
```

docs
```
const result = cartModule.getCartPos(12)
```

--------

init(payload)
set initial cart value. use this function to set current item list on your cart

params
```
param: payload
desc: array of item/s
type: array
required: true
format: [
    {
        id: item id,
        ....
    },
    {
        id: item id,
        ....
    },
]
example: [
    {
        id: 12,
        name: 'item 1'
        .... // rest item detail data
    },
    {
        id: 2,
        name: 'item 23'
        .... // your item detail data
    }
]
```

docs
```
cartModule.init([
    {
        id: 12,
        name: 'item 1'
        .... // rest item detail data
    },
    {
        id: 2,
        name: 'item 23'
        .... // your item detail data
    }
])
```

--------

add(payload)
add item to cart

params
```
param: payload
desc: object of item
type: object
required: true
format: {
    id: item id,
    ....
},
example: {
    id: 12,
    name: 'item 1'
    .... // rest item detail data
}
```

docs
```
cartModule.add({
    id: 12,
    name: 'item 1'
    .... // rest item detail data
})
```

--------

edit(payload)
if payload item durrently in cart list, it will update data item on cart list. 
id payload item not found on current cart list, it will add item payload to cart list

params
```
param: payload
desc: object of item
type: object
required: true
format: {
    id: item id,
    ....
},
example: {
    id: 12,
    name: 'item 1'
    .... // rest item detail data
}
```

docs
```
cartModule.edit({
    id: 12,
    name: 'item 1'
    .... // rest item detail data
})
```

--------

remove(payload)
remove item from cart list

params
```
param: payload
desc: object of item
type: object
required: true
format: {
    id: item id,
    ....
},
example: {
    id: 12,
    name: 'item 1'
    .... // rest item detail data
}
```

docs
```
cartModule.remove({
    id: 12,
    name: 'item 1'
    .... // rest item detail data
})
```

--------

toggle(payload)
if payload item currently not in cart list, it will add the item. if it is currently on item list, it will remove that item. it works just like a toggle


params
```
param: payload
desc: object of item
type: object
required: true
format: {
    id: item id,
    ....
},
example: {
    id: 12,
    name: 'item 1'
    .... // rest item detail data
}
```

docs
```
cartModule.toggle({
    id: 12,
    name: 'item 1'
    .... // rest item detail data
})
```

--------

reset() {
    clear cart make an empty list
}


docs
```
cartModule.reset()
```