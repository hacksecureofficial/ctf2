import express from 'express';
import md5 from 'md5';
import bodyParser from 'body-parser';

const app = express();
const port = 3111;

// The correct credentials (hashed values)
const CORRECT_USERNAME_HASH = '21232f297a57a5a743894a0e4a801fc3'; // MD5 hash of 'admin'
const CORRECT_PASSWORD_HASH = 'c8c605999f3d8352d7bb792cf3fdb25b'; // MD5 hash of 'adminnotfound'
const FLAG = 'H4CKS3C{YOU_GOT_IT}';

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Check credentials using hashed values
    if (md5(username.toLowerCase()) === CORRECT_USERNAME_HASH && md5(password) === CORRECT_PASSWORD_HASH) {
        res.json({ success: true, message: FLAG });
    } else {
        res.json({ success: false, message: 'Try again boi!!' });
    }
});

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

app.listen(port, () => {
    console.log(`CTF challenge is live at http://localhost:${port}`);
});