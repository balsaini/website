const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'pug');

app.listen(3000, function(){
  console.log('server is listening');
});

app.get ('/hello', function(req, res){
  res.render('hello');
});

app.get ('/hola', function(req, res){
  res.send('Mundo');
});

app.get ('/dog', function(req, res){
    res.send('woof!');
});

app.get('/add/:x/:y', function(req, res) {
    const x = req.params.x * 1;
    const y = req.params.y * 1;

    res.render('sum', {x: x, y: y, sum: x + y});
});

app.get ('/factorial/:x', function(req, res) {
  const n = req.params.x *1;
  let factorialnum = 1;

  if(n<=1) {
    factorialnum = 1;
  } else {
    var ret = 1;
    for(var i=2;i<=n;++i) {
      ret *= i;
    }
    factorialnum = ret;
  }

  res.render('factorial', { input: n, resultFact: factorialnum } );
});

//square the evens
app.get ('/squareEven/:x', function(req, res) {
  const nums = req.params.x.split(',');

    // three loops
  const numsEven = nums.filter( n => n%2 === 0 );
  const numSquare = numsEven.map(n => n*n)
  const numSquareAdd = numSquare.reduce( (a, n) => a+n);

  // one loop using reduce
  const results2 = nums.reduce( (a,n) => n%2 ? a+0 : a+(n*n), 0);


  res.send({ payload: numSquareAdd,
             payload2: results2 } );

});

app.get('/calc', function(req, res) {
    res.render('calc');
});

app.post('/calc', function(req, res) {
    console.log('reqbody=', req.body);
    const x = req.body.x * 1;
    const y = req.body.y * 1;
    let r = 0;


    switch (req.body.op) {
      case '+':
        r = x + y;
        break;
      case '-':
          r = x - y;
          break;
      case '*':
          r = x * y;
          break;
      case '/':
          r = x / y;
          break;

    }

    res.render('calc', {x, y, r, op: req.body.op})


});
