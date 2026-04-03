const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * [GET] Obtener perfil de aventurero por ID.
 * Usado para actualizar el Header de Niko y sus amigos.
 */
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "Aventurero no registrado en el Gremio." });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Fallo en el escaneo de ADN del usuario." });
    }
});

module.exports = router;