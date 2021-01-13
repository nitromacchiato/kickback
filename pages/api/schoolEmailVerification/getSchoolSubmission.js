
export default function handler(req, res) {
    const school = req.query.school 
    const email = req.query.email
    const username = req.query.username
    

    res.send('Email:' + email + ' School: ' +school + ' Username ' + username)
  }