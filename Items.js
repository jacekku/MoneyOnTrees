let items = {}

function setupItems() {
    let items = {
        money: new Item("Money", 10, images.coinImage),
        oak_saplings: new Item("Sapling", 5, images.saplingImage, Actions.PLANT, 15, 2),
        oak_log: new Item("Oak Log", 10, images.logImage, null, null, 20),
        oak_plank: new Item("Oak Plank", 10, images.plankImage, null, null, 10)
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
        items[item].setAmount(amountsObject[item])
    }
}