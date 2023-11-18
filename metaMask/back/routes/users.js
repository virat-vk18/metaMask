var express = require('express');
var router = express.Router();
let fs = require('fs')
const path = require('path')
let fsPromise = require('fs').promises
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

let arr = []
router.post('/formdata', (req, res) => {
  // formRegisterData.push(req.body)
  arr.push(req.body)

  // console.log(fs.existsSync(path.join(__dirname, 'data')));

  // fs.readFile('',, (err.data)=> {
  //   let jsonStore =[]
  // if(!fs.existsSync(path.join(__dirname, '..', 'data'))) {
  //   fsPromise.mkdir(path.join(__dirname, '..', 'data'))
  // }
  // if (fs.existsSync(path.join(__dirname, '..', 'data', 'formData.json'))) {
  //   let jsonData = fs.readdirSyncexistsSync(path.join(__dirname, '..', 'data', 'formData.json'))
  //   jsonStore = JSON.parse(jsonData)
  // }
  // jsonStore.push(req.body)

  // })

  //   fs.readFile(path.join(__dirname, 'data', 'formData.json'), (err, data) => {
  //     let json = []
  //     if (!err) {
  //       const data = fs.readFileSync(path.join(__dirname, 'data', 'formData.json'))
  //       jsonData = JSON.parse(data)
  //     }
  //     json.push(data)
  //     fs.writeFile(path.join(__dirname, 'data', 'formData.json'), JSON.stringify(json, null, 2), (err) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('success');
  //       }
  //     })

  //   })

  // } catch (err) {
  //   console.log(err);
  // }
})

router.get('/formData', function (req, res, next) {
  res.send(arr)
});

module.exports = router;
