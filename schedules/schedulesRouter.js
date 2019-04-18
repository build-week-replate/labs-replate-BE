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
  const {
    pickup_name,
    pickup_date,
    pickup_time,
    pickup_comment,
    location_id
  } = req.body;

  if (
    !pickup_comment ||
    !pickup_date ||
    !pickup_name ||
    !pickup_time ||
    !location_id
  ) {
    return res.status(400).json({ msg: "Bad request" });
  }

  try {
    const newSchedule = await Schedule.insert({
      ...req.body,
      taken: false,
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
    const all = await Schedule.getAll();
    console.log(all);
    const oldSchedule = await Schedule.getOneById(req.params.id);

    console.log(oldSchedule);

    if (!oldSchedule) {
      return res.status(404).json({ msg: "This schedule does not exist" });
    }

    if (oldSchedule.company_id !== req.decoded.subject) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const newSchedule = await Schedule.update(req.params.id, {
      ...req.body
    });

    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/:id/take", async (req, res) => {
  try {
    const schedule = await Schedule.getOneById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ msg: "Schedule not found" });
    }

    if (schedule.company_id === req.decoded.subject) {
      res
        .status(422)
        .json({ msg: "A company can not accept a request for volunteers" });
    }

    const newSchedule = await Schedule.update(req.params.id, {
      volunteer_id: req.decoded.subject,
      taken: true
    });

    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const oldSchedule = await Schedule.getOneById(req.params.id);

  if (!oldSchedule) {
    return res.status(404).json({ msg: "This schedule does not exist" });
  }

  if (oldSchedule.company_id !== req.decoded.subject) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const deleted = await Schedule.remove(req.params.id);

    return res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
