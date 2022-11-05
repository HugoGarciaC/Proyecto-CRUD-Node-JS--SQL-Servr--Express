//SE IMPORTAN LOS CONTROLADORES Y CLASES

//CONTROLADOR Y CLASE DE LA TABLA ASIGNATURA
var asignaturaController = require('./Controllers/asignaturaController');
var asignatura = require('./Clases/asignatura');

//CONTROLADOR Y CLASE DE LA TABLA DOCENTES
var docenteController = require('./Controllers/docenteController');
var docente = require('./Clases/docente');

//CONTROLADOR Y CLASE DE LA TABLA ESTUDIANTES
var estudianteController = require('./Controllers/estudianteController');
var estudiante = require('./Clases/estudiante');

//CONTROLADOR Y CLASE DE LA TABLA RECORD ACADEMIO
var recordController = require('./Controllers/recordController');
var record = require('./Clases/record');


var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
//const { application } = require('express');
//const { connect } = require('mssql');
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

var port = process.env.port || 8090;
app.listen(port);
console.log('running in the port ' + port);

router.use((request, response, next) => {
    console.log('Welcome, Time:', Date.now());
    next();
});


//CRUD DE LA TABLA ASIGNATURA
router.route('/subjects').get((request, response) => {
    asignaturaController.getSubjects().then(result => {
        response.json(result);
        console.log(result)
    })
})

router.route('/subjects/:Cod').get((request, response) => {
    asignaturaController.getSubjectsById(request.params.Cod).then(result => {
        response.json(result);
        console.log(result)
    })
})

router.route('/subjects').post((request, response) => {
    let subject = { ...request.body }
    asignaturaController.post(subject).then(result => {
        response.status(201).json(result);
        console.log(result)
    })
})

router.route('/subject/edit/:ID').put((request, response) => {
    let subject = { ...request.body }
    asignaturaController.put(subject, request.params.ID).then(result => {
        response.json(result)
        console.log(result)
        //console.log('Creado!!!')
    })
})

router.route('/subject/delete/:Codigo').delete((request, response) => {
    let subject = { ...request.body }
    asignaturaController.deleteByCod(subject, request.params.Codigo).then(result => {
        response.json(result)
        // console.log(result)
        console.log('Asignatura Eliminada!!!')
    })
})


//CRUD DE LA TABLA DOCENTE
router.route('/teachers').get((request, response) => {
    docenteController.getTeachers().then(result => {
        response.json(result);
        console.log(result)
    })
})

router.route('/teachers/:Cod_Docente').get((request, response) => {
    docenteController.getTeachersById(request.params.Cod_Docente).then(result => {
        response.json(result);
        console.log(result)
    })
})

router.route('/teachers').post((request, response) => {
    let teacher = { ...request.body }
    docenteController.post(teacher).then(result => {
        response.status(201).json(result);
        console.log(result)
        //console.log('Creado!!!')
    })
})

router.route('/teacher/edit/:ID').put((request, response) => {
    let teacher = { ...request.body }
    docenteController.put(teacher, request.params.ID).then(result => {
        response.json(result)
        console.log(result)
        //console.log('Creado!!!')
    })
})

router.route('/teacher/delete/:Codigo_Docente').delete((request, response) => {
    let teacher = { ...request.body }
    docenteController.deleteDocenteByCod(teacher, request.params.Codigo_Docente).then(result => {
        response.json(result)
        // console.log(result)
        console.log('Docente Eliminado!!!')
    })
})


//CRUD DE LA TABLA ESTUDIANTE
router.route('/students').get((request, response) => {
    estudianteController.getStudents().then(result => {
        response.json(result);
        console.log(result)
    })
})

router.route('/students/:Cod_Estudiante').get((request, response) => {
    estudianteController.getStudentsById(request.params.Cod_Estudiante).then(result => {
        response.json(result);
        console.log(result)
    })
})

router.route('/students').post((request, response) => {
    let student = { ...request.body }
    estudianteController.post(student).then(result => {
        response.status(201).json(result);
        console.log(result)
        //console.log('Creado!!!')
    })
})

router.route('/student/edit/:ID').put((request, response) => {
    let student = { ...request.body }
    estudianteController.put(student, request.params.ID).then(result => {
        response.json(result)
        console.log(result)
        //console.log('Creado!!!')
    })
})

router.route('/student/delete/:Codigo_Estudiante').delete((request, response) => {
    let student = { ...request.body }
    estudianteController.deleteEstudianteByCod(student, request.params.Codigo_Estudiante).then(result => {
        response.json(result)
        // console.log(result)
        console.log('Estudiante Eliminad@!!!')
    })
})


//CRUD DE LA TABLA RECORD ACADEMICO
router.route('/records').get((request, response) => {
    recordController.getRecords().then(result => {
        response.json(result);
        console.log(result)
    })
})

router.route('/records/:Cod').get((request, response) => {
    recordController.getRecordsById(request.params.Cod).then(result => {
        response.json(result);
        console.log(result)
    })
})

router.route('/records').post((request, response) => {
    let record = { ...request.body }
    recordController.post(record).then(result => {
        response.status(201).json(result);
        console.log(result)
        //console.log('Creado!!!')
    })
})

router.route('/record/edit/:ID').put((request, response) => {
    let record = { ...request.body }
    recordController.put(record, request.params.ID).then(result => {
        response.json(result)
        console.log(result)
        //console.log('Creado!!!')
    })
})

router.route('/record/delete/:Codigo').delete((request, response) => {
    let record = { ...request.body }
    recordController.deleteRecordByCod(record, request.params.Codigo).then(result => {
        response.json(result)
        // console.log(result)
        console.log('Record Academico Eliminado!!!')
    })
})