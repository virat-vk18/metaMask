var express = require('express');
var router = express.Router();
const web3 = require('web3')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/web', async (req, res) => {
  const webData = web3.eth.accounts.create();
  res.status(200).json(webData)
  console.log(webData);
  // res.json(rest)
})

module.exports = router;
