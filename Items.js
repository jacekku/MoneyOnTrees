let items = {}
let treeItems={}
function setupItems() {
    let items = {
                        //name  amount  image   Action  buyPrice    SellPrice   typeOfTree
        money: new Item("Money", 0, images.coinImage),
        oak_saplings: new Item("Oak Sapling", 1, images.oak_sapling, Actions.PLANT, 30, 3,"oak"),
        oak_log: new Item("Oak Log", 0, images.oak_log, null, null, 15),
        oak_plank: new Item("Oak Plank", 0, images.oak_plank, null, null, 10),

        pine_saplings: new Item("Pine Sapling", 0, images.pine_sapling, Actions.PLANT, 1000, 100,"pine"),
        pine_log: new Item("Pine Log", 0, images.pine_log, null, null, 500),
        pine_plank: new Item("Pine Plank", 0, images.pine_plank, null, null, 300),
        
        cherry_saplings: new Item("Cherry Sapling", 0, images.cherry_sapling, Actions.PLANT, 30000, 3000,"cherry"),
        cherry_log: new Item("Cherry Log", 0, images.cherry_log, null, null, 15000),
        cherry_plank: new Item("Cherry Plank", 0, images.cherry_plank, null, null, 5000),
        cherry_fruit: new Item("Cherry Fruit", 0, images.cherry_fruit, null, null, 20000),


        iterator:{}
    }
    treeItems={
        oak:{
            chopItem:items.oak_log,
            harvestItem:null
        },
        pine:{
            chopItem:items.pine_log,
            harvestItem:null
        },
        cherry:{
            chopItem:items.cherry_log,
            harvestItem:items.cherry_fruit
        }
    }
    return items
}
function getAmounts(){
    let output={}
    for(const item in items){
        output[item]=items[item].amount
    }
    return output
}

function setAmounts(amountsObject){
    for(const item in items){
        if(items[item] instanceof Item)items[item].setAmount(amountsObject[item])
    }
    items.iterator[Symbol.iterator]=function*(){
        for(const item in items){
            if(items[item] instanceof Item)yield items[item]
        }
    }
}

