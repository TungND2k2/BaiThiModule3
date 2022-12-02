const _handle = require("../handle/handle");
const connection = require("../model/DBconect");
const BaseController = require("./base.controller");
const url = require("url");
const qs = require("qs");

class StudentController extends BaseController {
    async listStudent(req, res) {
        const sql = 'SELECT * FROM students';
        let students = await this.querySQL(sql);

        let html = "";

        students.forEach((student, index) => {
            html += "<tr>";
            html += `<td>${index+1}</td>`;
            html += `<td><a href="/infor/student?id=${student.id}">${student.name}</a></td>`;
            html += `<td>${student.classStudent}</td>`;
            html += `<td>${student.evaluate}</td>`;
            html += `<td> <a href="/delete/student?id=${student.id}" onclick="return confirm('Are you sure ?')" <button class="btn btn-danger">Delete</button></a> </td>`;
            html += `<td> <a href="/edit/student?id=${student.id}" onclick="return confirm('Are you sure ?')" <button class="btn btn-info">Edit</button></a> </td>`;
            html += "</tr>";
        })

        let data = await _handle.getTemplate('./view/home.html')
        data = data.replace('{list-student}', html)
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        res.end();
    }
    async deleteStudent(req,res){
        let parseUrl = url.parse(req.url, true);
        let path = parseUrl.query;
        let index = qs.parse(path);
        let id=+index.id;
        let sql = `delete from students where id = ${id}`;
        let result=await this.querySQL(sql);
        res.writeHead(301,{Location:'/home'});
        res.end();

    }
    async editStudent(req,res){
            let parseUrl = url.parse(req.url, true);
            let path = parseUrl.query;
            let index = qs.parse(path);
            let id = +index.id;
            let urlPath = req.method
            if (urlPath === 'GET') {
                let sqlpro = `select * from students where id = ${id}`
                let student = await this.querySQL(sqlpro);
                let dataEdit = await _handle.getTemplate('./view/editStudent.html')
                dataEdit =dataEdit.replace('{input-name}', `<input width="100px" type="text" value="${student[0].name}" class="form-control" placeholder="Name " name="name">`);
                dataEdit = dataEdit.replace('{input-class}',`<input  type="text" value="${student[0].classStudent}" class="form-control" placeholder="Class" name="class" >`);
                dataEdit =dataEdit.replace('{input-point_theory}',`<input  type="text" value="${student[0].point_theory}" class="form-control" placeholder="Poin theory" name="theory" >`);
                dataEdit = dataEdit.replace('{input-evaluate}',`<input  type="text" value="${student[0].evaluate}"  class="form-control" placeholder="Evaluate(tachieved,not tachieved)" name="evaluate" >`);
                dataEdit = dataEdit.replace('{input-point_practice}',` <input  type="text" value="${student[0].point_practice}" class="form-control" placeholder="Point practice" name="practice" >`)
                dataEdit = dataEdit.replace('{input-describe_student}',` <input  type="text" value="${student[0].describe_student}" class="form-control" placeholder="Point practice" name="describe" >`)
                res.writeHead(200, {'Content-type': 'text/html'});
                res.write(dataEdit);
                res.end();
            } else {
                let data = ""
                req.on('data', chunk => {
                    data += chunk
                })
                req.on('end', async () => {

                    let dataInfo = qs.parse(data);
                    let name = dataInfo.name;
                    let classStudent = dataInfo.class;
                    let theory = dataInfo.theory;
                    let evaluate = dataInfo.evaluate;
                    let practice = dataInfo.practice;
                    let describe = dataInfo.describe;
                    let sql = `update students set name = '${name}',classStudent = '${classStudent}',point_theory = ${theory},evaluate = '${evaluate}',point_practice = ${practice},describe_student='${describe}' where id = ${id}`;
                    let result = await this.querySQL(sql);

                    res.writeHead(301, {Location: '/home'})
                    res.end();
                })
            }
        }
        async showInfoStudent(req, res) {
            let parseUrl = url.parse(req.url, true);
            let path = parseUrl.query;
            let index = qs.parse(path);
            let id = +index.id;
            let sql=`select * from students where id=${id}`
            let result=await this.querySQL(sql);
            let html = "";

            result.forEach((student, index) => {
                html += "<tr>";
                html += `<td>${index+1}</td>`;
                html += `<td>${student.name}</td>`;
                html += `<td>${student.classStudent}</td>`;
                html += `<td>${student.point_theory}</td>`;
                html += `<td>${student.evaluate}</td>`;
                html += `<td>${student.point_practice}</td>`;
                html += `<td>${student.describe_student}</td>`;
                html += "</tr>";
            })

            let data = await _handle.getTemplate('./view/inforStudent.html')
            data = data.replace('{list-student}', html)
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(data);
            res.end();
        }
    async addProduct(req, res) {
        let urlPath = req.method
        if (urlPath === 'GET') {
            let dataRegister = await _handle.getTemplate('./view/addStudent.html')
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(dataRegister);
            res.end();
        } else {
            let data = ""
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', async () => {

                let dataInfo = qs.parse(data);
                let name = dataInfo.name;
                let classStudent = dataInfo.class_student;
                let theory = dataInfo.poin_theory;
                let evaluate = dataInfo.evaluate;
                let practice = dataInfo.point_practice;
                let describeStudent = dataInfo.describe_student;

                let sql = `Insert into students(name,classStudent,point_theory,evaluate,point_practice,describe_student) value ('${name}', '${classStudent}',${theory},'${evaluate}',${practice},'${describeStudent}')`;
                let result = await this.querySQL(sql);

                res.writeHead(301, {Location: '/home'})
                res.end();
            })
        }
    }

}

module.exports=StudentController