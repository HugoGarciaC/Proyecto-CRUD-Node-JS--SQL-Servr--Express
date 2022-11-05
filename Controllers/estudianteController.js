var config = require('../Conexion/dbconfig')
const sql = require('mssql');
const Docentes = require('../Clases/estudiante')

//Listar Todos
async function getStudents() {
    try {
        let pool = await sql.connect(config);
        let students = await pool.request()
            .query('SELECT ID, Codigo_Estudiante, Nombres, Apellidos, Semestre, Carrera, Cod_Asignatura FROM Estudiantes ORDER BY ID')
        return students.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Listar Por Codigo
async function getStudentsById(Cod_Estudiante) {
    try {
        let pool = await sql.connect(config);
        let students = await pool.request()
            .input('Codigo_Estudiante', sql.VarChar, Cod_Estudiante)
            .execute('Sp_MostrarEstudiantesPorCod')
        return students.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Insertar
async function post(Estudiantes) {
    try {
        let pool = await sql.connect(config);

        let saveStudents = await pool.request()
            .input('Codigo_Estudiante', sql.VarChar, Estudiantes.Codigo_Estudiante)
            .input('Nombres', sql.VarChar, Estudiantes.Nombres)
            .input('Apellidos', sql.VarChar, Estudiantes.Apellidos)
            .input('Semestre', sql.VarChar, Estudiantes.Semestre)
            .input('Carrera', sql.VarChar, Estudiantes.Carrera)
            .input('Cod_Asignatura', sql.VarChar, Estudiantes.Cod_Asignatura)
            .execute('Sp_GuardarEstudiante');
        return saveStudents.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//update
async function put(Estudiantes, ID) {
    try {
        let pool = await sql.connect(config);

        let updateStudents = await pool.request()
            .input('ID', sql.Int, Estudiantes.ID)
            .input('Codigo_Estudiante', sql.VarChar, Estudiantes.Codigo_Estudiante)
            .input('Nombres', sql.VarChar, Estudiantes.Nombres)
            .input('Apellidos', sql.VarChar, Estudiantes.Apellidos)
            .input('Semestre', sql.VarChar, Estudiantes.Semestre)
            .input('Carrera', sql.VarChar, Estudiantes.Carrera)
            .input('Cod_Asignatura', sql.VarChar, Estudiantes.Cod_Asignatura)
            .execute('Sp_ActualizarEstudiante');
            //.query("UPDATE ORDERS SET Title = @title, Quantity = @quantity, Mesages = @message, City = @city WHERE Id = @id")
        //.execute();
        return updateStudents.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Eliminar
async function deleteEstudianteByCod(Estudiantes, Cod_Estudiante) {
    try {
        let pool = await sql.connect(config);

        let deleteStudents = await pool.request()
            .input('Codigo_Estudiante', sql.VarChar, Estudiantes.Codigo_Estudiante)
            .execute('Sp_EliminarEstudiante')
        return deleteStudents.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getStudents: getStudents,
    getStudentsById: getStudentsById,
    post: post,
    put: put,
    deleteEstudianteByCod: deleteEstudianteByCod
};