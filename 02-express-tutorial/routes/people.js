const express = require('express');
const router = express.Router();

const {getPeople, createPerson, createPersonPostman, updatePerson, deletePerson} = require('../controllers/people');

// router: /api/people

// first approach each URL has separate route. ---------------------------------------------
// router.get('/', getPeople);
// router.post('/', createPerson);
// router.post('/postman', createPersonPostman);
// router.put('/:id', updatePerson);
// router.delete('/:id', deletePerson);


// second approach: chaining the that URLs are the same. -----------------------------------
router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPersonPostman);
router.route('/:id').put(updatePerson).delete(deletePerson);


module.exports = router;