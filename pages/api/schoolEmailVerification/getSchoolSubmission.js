
export default function handler(req, res) {
    const school = req.query.school 
    const email = req.query.email
    

    res.send('Email:' + email + ' School: ' +school)
  }