const { model } = require("mongoose")
const Item = require("../model/Item")


//Create or Add new Item
const item_create = async (req, res) => {
    const item = new Item({
        task: req.body.task,
        description: req.body.description,
        Status: req.body.Status,
        userId: req.body.userId
    })

    try {
        const savedItem = await item.save();
        res.send(savedItem)
    } catch (error) {
        res.status(400).send(error)
    }


}

//update product
const item_update = async (req, res) => {
    try {
        const item = {
            description: req.body.description,
            Status: req.body.Status
        }

        const updateItem = await Item.findByIdAndUpdate(
            { _id: req.params.itemId },
            item
        )
        res.json(updateItem)
    } catch (error) {
        res.status(400).send(error)
    }

}

//Delete an Item

const item_delete = async (req, res) => {
    try {
        const removeItem = await Item.findByIdAndDelete(req.params.itemId)
        res.json(removeItem);
    } catch (error) {
        res.json({ message: error })
    }
}

//pagination

const getItemPaginate = async (req, res) => {
    const resultsPerPage = 5;
    let page = req.query.page >= 1 ? req.query.page : 1;
    const userId = req.query.userId;

    page = page - 1

    Item.find({ userId: userId })
        .limit(resultsPerPage)
        .skip(resultsPerPage * page)
        .then((results) => {
            return res.status(200).send(results);
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
}



module.exports = {
    item_create,
    item_update,
    item_delete,
    getItemPaginate
}

