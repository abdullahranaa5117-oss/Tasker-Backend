const Category = require('../models/Category.model');
const createnewCategory = async (req, res) => {
    try {
        let { Name ,Color} = req.body;
        if (!Name || !Color) {
            return  res.status(400).json({ message: 'Name and Color are required' });
        }
        const createCategory = await Category.create({ Name , Color});
        res.status(201).json(createCategory);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
}
const getCategory = async (req, res) => {
    try {
        const getAllCategory = await Category.find();
        return res.status(200).json(getAllCategory);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message })
    }
}
const updateCategory = async (req, res) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).json(updateCategory);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
}
const deleteCategory = async (req, res) => {
    try {
        const deleteCategory = await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json(deleteCategory);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createnewCategory,
    getCategory,
    updateCategory,
    deleteCategory
};