const express = require("express");
const Locations = require("./locationModal");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);

router.get("/:companyId", async (req, res) => {
  try {
    const locations = await Locations.getAllByCompanyId(req.params.companyId);

    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const { office_name, office_address } = req.body;

  if (!office_address || !office_name) {
    return res.status(400).json({ msg: "Please provide the necessary fields" });
  }

  try {
    const newLocation = await Locations.insert({
      ...req.body,
      company_id: req.decoded.subject
    });

    res.status(201).json(newLocation);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
