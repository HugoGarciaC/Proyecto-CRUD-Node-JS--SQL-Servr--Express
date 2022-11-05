var config = require('../Conexion/dbconfig')
const sql = require('mssql');
const Docentes = require('../Clases/docente')


//Listar Todos
async function getTeachers() {
    try {
        let pool = await sql.connect(config);
        let teachers = await pool.request()
            .query('SELECT ID, Codigo_Docente, Nombres, Apellidos, Cod_Asignatura FROM Docentes ORDER BY ID')
        return teachers.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Listar Por Codigo
async function getTeachersById(Cod_Docente) {
    try {
        let pool = await sql.connect(config);
        let teachers = await pool.request()
            .input('Codigo_Docente', sql.VarChar, Cod_Docente)
            .execute('Sp_MostrarDocentesPorCod')
        return teachers.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Insertar
async function post(Docentes) {
    try {
        let pool = await sql.connect(config);

        let saveTeachers = await pool.request()
            .input('Codigo_Docente', sql.VarChar, Docentes.Codigo_Docente)
            .input('Nombres', sql.VarChar, Docentes.Nombres)
            .input('Apellidos', sql.VarChar, Docentes.Apellidos)
            .input('Cod_Asignatura', sql.VarChar, Docentes.Cod_Asignatura)
            .execute('Sp_GuardarDocente');
        return saveTeachers.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Actualizar
async function put(Docentes, ID) {
    try {
        let pool = await sql.connect(config);

        let updateTeachers = await pool.request()
            .input('ID', sql.Int, Docentes.ID)
            .input('Codigo_Docente', sql.VarChar, Docentes.Codigo_Docente)
            .input('Nombres', sql.VarChar, Docentes.Nombres)
            .input('Apellidos', sql.VarChar, Docentes.Apellidos)
            .input('Cod_Asignatura', sql.VarChar, Docentes.Cod_Asignatura)
            .execute('Sp_ActualizarDocente');
        return updateTeachers.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Eliminar
async function deleteDocenteByCod(Docentes, Cod_Docente) {
    try {
        let pool = await sql.connect(config);

        let deleteTeachers = await pool.request()
            .input('Codigo_Docente', sql.VarChar, Docentes.Codigo_Docente)
            .execute('Sp_EliminarDocente')
        return deleteTeachers.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTeachers: getTeachers,
    getTeachersById: getTeachersById,
    post: post,
    put: put,
    deleteDocenteByCod: deleteDocenteByCod
};