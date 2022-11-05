var config = require('../Conexion/dbconfig')
const sql = require('mssql');
const Asignaturas = require('../Clases/asignatura')

//Listar Todas
async function getSubjects() {
    try {
        let pool = await sql.connect(config);
        let subjects = await pool.request()
            .query('SELECT ID, Codigo, Nombre, Creditos FROM Asignaturas ORDER BY ID')
        return subjects.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Listar Por Codigo
async function getSubjectsById(Cod) {
    try {
        let pool = await sql.connect(config);
        let subjects = await pool.request()
            .input('Codigo', sql.VarChar, Cod)
            .execute('Sp_MostrarAsignaturasPorCod')
        return subjects.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Insertar
async function post(Asignaturas) {
    try {
        let pool = await sql.connect(config);

        let saveSubjects = await pool.request()
            .input('Codigo', sql.VarChar, Asignaturas.Codigo)
            .input('Nombre', sql.VarChar, Asignaturas.Nombre)
            .input('Creditos', sql.TinyInt, Asignaturas.Creditos)
            .execute('Sp_GuardarAsignatura');
        return saveSubjects.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Actualizar
async function put(Asignaturas, ID) {
    try {
        let pool = await sql.connect(config);

        let updateSubjects = await pool.request()
            .input('ID', sql.Int, Asignaturas.ID)
            .input('Codigo', sql.VarChar, Asignaturas.Codigo)
            .input('Nombre', sql.VarChar, Asignaturas.Nombre)
            .input('Creditos', sql.TinyInt, Asignaturas.Creditos)
            .execute('Sp_ActualizarAsignatura');
        return updateSubjects.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Eliminar
async function deleteByCod(Asignaturas, Cod) {
    try {
        let pool = await sql.connect(config);

        let deleteSubjects = await pool.request()
            .input('Codigo', sql.VarChar, Asignaturas.Codigo)
            .execute('Sp_EliminarAsignatura')
        return deleteSubjects.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getSubjects: getSubjects,
    getSubjectsById: getSubjectsById,
    post: post,
    put: put,
    deleteByCod: deleteByCod
};