const express = require("express");
const Schedule = require("./scheduleModel");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);

router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.getAll();

    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const { pickup_name, pickup_date, pickup_time, pickup_comment } = req.body;

  if (!pickup_comment || !pickup_date || !pickup_name || !pickup_time) {
    return res.status(400).json({ msg: "Bad request" });
  }

  try {
    const newSchedule = await Schedule.insert({
      ...req.body,
      company_id: req.decoded.subject
    });

    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/:id", async (req, res) => {
  const { pickup_name, pickup_date, pickup_time, pickup_comment } = req.body;

  if (!pickup_comment || !pickup_date || !pickup_name || !pickup_time) {
    return res.status(400).json({ msg: "Bad request" });
  }

  try {
    const oldSchedule = await Schedule.getOneById(req.params.id);

    if (!oldSchedule) {
      return res.status(404).json({ msg: "This schedule does not exist" });
    }

    if (!oldSchedule.company_id !== req.decoded.subject) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const newSchedule = await Schedule.insert({
      ...oldSchedule,
      ...req.body
    });

    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const oldSchedule = await Schedule.getOneById(req.params.id);

  if (!oldSchedule) {
    return res.status(404).json({ msg: "This schedule does not exist" });
  }

  if (!oldSchedule.company_id !== req.decoded.subject) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const deleted = await Schedule.delete(req.params.id);

    return res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
