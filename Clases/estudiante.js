class Estudiante {
    constructor(ID, Codigo_Estudiante, Nombres, Apellidos, Semestre, Carrera, Cod_Asignatura){
        this.ID = ID;
        this.Codigo_Estudiante = Codigo_Estudiante,
        this.Nombres = Nombres,
        this.Apellidos = Apellidos,
        this.Semestre = Semestre,
        this.Carrera = Carrera,
        this.Cod_Asignatura = Cod_Asignatura
    }
}
module.exports = Estudiante;