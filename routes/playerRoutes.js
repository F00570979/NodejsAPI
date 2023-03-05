const express = require("express");
const router = express.Router();
const Player = require("../models/player");

// Get all players
router.get("/players", async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get 
router.get("/players/:id", getPlayer, (req, res) => {
  res.json(res.player);
});

// Create 
router.post("/players", async (req, res) => {
  const player = new Player({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    touchdowns: req.body.touchdowns,
    rushingyards: req.body.rushingyards,
  });

  try {
    const newPlayer = await player.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update 
router.patch("/players/:id", getPlayer, async (req, res) => {
  if (req.body.firstname != null) {
    res.player.firstname = req.body.firstname;
  }

  if (req.body.lastname != null) {
    res.player.lastname = req.body.lastname;
  }

  if (req.body.touchdowns != null) {
    res.player.touchdowns = req.body.touchdowns;
  }

  if (req.body.rushingyards != null) {
    res;
    player.rushingyards = req.body.rushingyards;
  }

  try {
    const updatedPlayer = await res.player.save();
    res.json(updatedPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete 
router.delete("/players/:id", getPlayer, async (req, res) => {
  try {
    await res.player.remove();
    res.json({ message: "Player deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a player by ID
async function getPlayer(req, res, next) {
  let player;

  try {
    player = await Player.findById(req.params.id);

    if (player == null) {
      return res.status(404).json({ message: "Player Can't be Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.player = player;
  next();
}

module.exports = router;
