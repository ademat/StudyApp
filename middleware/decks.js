//@desc Get all available decks
//@url GET api/v1/decks
//@access private
exports.getAllDecks = (req, res) => {
  res.status(200).json({ succes: true, data: 'All decks will be displayed here' })
};

//@desc Get a deck
//@url GET api/v1/decks/:id
//@access private
exports.getDeck = (req, res) => {
  res.json({ succes: true, data: `Deck ${req.params.id} will be displayed here` })
}

//@desc Create a deck
//@url POST api/v1/decks/:id
//@access private
exports.createDeck = (req, res) => {
  res.json({ succes: true, data: `Create deck with ID ${req.params.id}` })
}

//@desc Update a deck
//@url PUT api/v1/decks/:id
//@access private
exports.updateDeck = (req, res) => {
  res.json({ succes: true, data: `Update deck with ID ${req.params.id}` })
}

//@desc Delete a deck
//@url DELETE api/v1/decks/:id
//@access private
exports.deleteDeck = (req, res) => {
  res.json({ succes: true, data: `Delete deck with ID ${req.params.id}` })
}