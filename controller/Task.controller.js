const Task = require("../models/Task.model");


const createnewTask = async (req, res) => {
  try {
    const { Title, Description, DueDate, DueTime, Status, Category, Progress } = req.body;

    if (!Title || !Description || !DueDate || !DueTime || !Status || !Category || Progress === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const created = await Task.create({
      Title,
      Description,
      DueDate,
      DueTime,
      Status,
      Category,
      Progress,
      User: req.user.id
    });

    const createTask = await Task.findById(created._id)
      .populate("Status")
      .populate("Category");

    res.status(201).json(createTask);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const getTask = async (req, res) => {
  try {
    const getAllTask = await Task.find({ User: req.user.id })
      .populate("Status")
      .populate("Category")

    return res.status(200).json(getAllTask);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const updateTask = await Task.findOneAndUpdate(
      { _id: req.params.id, User: req.user.id }, req.body, { new: true }
    ).populate("Status").populate("Category");

    if (!updateTask) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    return res.status(200).json(updateTask);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findOneAndDelete({ _id: req.params.id, User: req.user.id });

    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    return res.status(200).json(deleteTask);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createnewTask,
  getTask,
  updateTask,
  deleteTask
};
