let items = {}

function setupItems() {
    let items = {
        money: new Item("Money", 10, images.coinImage),
        oak_saplings: new Item("Oak Sapling", 1, images.oak_sapling, Actions.PLANT, 15, 2,"oak"),
        oak_log: new Item("Oak Log", 0, images.oak_log, null, null, 20),
        oak_plank: new Item("Oak Plank", 0, images.oak_plank, null, null, 10),
        pine_saplings: new Item("Pine Sapling", 1, images.pine_sapling, Actions.PLANT, 15, 2,"pine"),
        pine_log: new Item("Pine Log", 0, images.pine_log, null, null, 20),
        pine_plank: new Item("Pine Plank", 0, images.pine_plank, null, null, 10),

        iterator:{}
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

