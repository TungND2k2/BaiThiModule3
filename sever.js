const http = require('http');
const fs = require('fs');
const url = require('url');
const PORT = 3030;
const StudentController = require('./controller/Student.Controller');
const studentController = new StudentController()
const sever = http.createServer((req, res) => {
    let urlPath = url.parse(req.url);
    switch (urlPath.pathname) {
        case '/home':
            studentController.listStudent(req, res);
            break;
        case '/delete/student':
            studentController.deleteStudent(req, res);
            break;
        case '/edit/student':
            studentController.editStudent(req, res);
            break;
        case '/infor/student':
            studentController.showInfoStudent(req, res);
            break;
        case '/add/student':
            studentController.addProduct(req, res);
            break;
            default:
            res.end()
    }
})
sever.listen(PORT, 'localhost', () => {
    console.log('Server running on port ' + PORT)
})