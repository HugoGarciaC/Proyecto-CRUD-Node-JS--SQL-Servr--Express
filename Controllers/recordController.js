var config = require('../Conexion/dbconfig')
const sql = require('mssql');
const Docentes = require('../Clases/record')

//Listar Todos
async function getRecords() {
    try {
        let pool = await sql.connect(config);
        let records = await pool.request()
            .query('SELECT ID, Codigo, Fecha, Periodo, Cod_Estudiante, Cod_Docente, Nota1, Nota2, Promedio FROM Record_Academico ORDER BY ID')
        return records.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Listar Por Codigo
async function getRecordsById(Cod) {
    try {
        let pool = await sql.connect(config);
        let records = await pool.request()
            .input('Codigo', sql.VarChar, Cod)
            .execute('Sp_MostrarRecordAPorCod')
        return records.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Insertar
async function post(RecordsA) {
    try {
        let pool = await sql.connect(config);

        let saveRecords = await pool.request()
            .input('Codigo', sql.VarChar, RecordsA.Codigo)
            .input('Fecha', sql.Date, RecordsA.Fecha)
            .input('Periodo', sql.VarChar, RecordsA.Periodo)
            .input('Cod_Estudiante', sql.VarChar, RecordsA.Cod_Estudiante)
            .input('Cod_Docente', sql.VarChar, RecordsA.Cod_Docente)
            .input('Nota1', sql.Decimal(3,2), RecordsA.Nota1)
            .input('Nota2', sql.Decimal(3,2), RecordsA.Nota2)
            .execute('Sp_GuardarRecordA');
        return saveRecords.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Actualizar
async function put(RecordsA, ID) {
    try {
        let pool = await sql.connect(config);

        let updateRecords = await pool.request()
            .input('ID', sql.Int, RecordsA.ID)
            .input('Codigo', sql.VarChar, RecordsA.Codigo)
            .input('Fecha', sql.Date, RecordsA.Fecha)
            .input('Periodo', sql.VarChar, RecordsA.Periodo)
            .input('Cod_Estudiante', sql.VarChar, RecordsA.Cod_Estudiante)
            .input('Cod_Docente', sql.VarChar, RecordsA.Cod_Docente)
            .input('Nota1', sql.Decimal(3,2), RecordsA.Nota1)
            .input('Nota2', sql.Decimal(3,2), RecordsA.Nota2)
            .execute('Sp_ActualizarRecord');
        return updateRecords.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Eliminar
async function deleteRecordByCod(RecordsA, Codigo) {
    try {
        let pool = await sql.connect(config);

        let deleteRecords = await pool.request()
            .input('Codigo', sql.VarChar, RecordsA.Codigo)
            /*.input('title', sql.NVarChar,Orders.Title)
             .input('quantity', sql.TinyInt, Orders.Quantity)
             .input('message', sql.NVarChar,Orders.Mesages)
             .input('city', sql.NVarChar,Orders.City)*/
            .execute('Sp_EliminarRecordA')
        //.query("DELETE ORDERS WHERE Id = @id")
        //.execute();
        return deleteRecords.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getRecords: getRecords,
    getRecordsById: getRecordsById,
    post: post,
    put: put,
    deleteRecordByCod: deleteRecordByCod
};