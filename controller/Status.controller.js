    const Status = require('../models/Status.model');
    const createnewStatus = async (req, res) => {
        try {
            let { Name ,Icon} = req.body;
            if (!Name || !Icon) {
                return  res.status(400).json({ message: 'Name and Icon are required' });
            }
            const createStatus = await Status.create({ Name,Icon });
            res.status(201).json(createStatus);

        } catch (err) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        }
    } 
    const getStatus = async (req, res) => {
        try {
            const getAllStatus = await Status.find();
            return res.status(200).json(getAllStatus);
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        }
    }
    const updateStatus = async (req, res) => {
        try {
            const updateStatus = await Status.findByIdAndUpdate(req.params.id,req.body,{new:true});
            return res.status(200).json(updateStatus);
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        }
    }
    const deleteStatus = async (req, res) => {
        try {
            const deleteStatus = await Status.findByIdAndDelete(req.params.id);
            return res.status(200).json(deleteStatus);
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        }
    };

    module.exports = {
        createnewStatus,
        getStatus,
        updateStatus,
        deleteStatus
    };