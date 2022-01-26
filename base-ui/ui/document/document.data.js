
const documentTypeOptions = [
    { name: 'DNI', value: 'dni' },
    { name: 'LC', value: 'lc' },
    { name: 'CI', value: 'ci' },
    { name: 'LE', value: 'le' },
    { name: 'CIPF', value: 'cipf' },
    { name: 'PASAP', value: 'pasap' },
    { name: 'CUIT/CUIL', value: 'cuit' },
]

const documentTypeRules = {
    dni: [
        { required: true, message: 'Debe ingresar un DNI' },
        { max: 8, min: 8, message: 'Debe ingresar 8 dígitos' },
        {
            pattern: /^[0-9]*$/,
            message: 'DNI inválido'
        }
    ],
    lc: [
        { required: true, message: 'Debe ingresar LC' },
    ],
    ci: [{ required: true, message: 'Debe ingresar CI' }],
    le: [{ required: true, message: 'Debe ingresar LE' }],
    cipf: [{ required: true, message: 'Debe ingresar CIPF' }],
    pasap: [{ required: true, message: 'Debe ingresar Nro de Pasaporte' }],
    cuit: [{ required: true, message: 'Debe ingresar un CUIT/CUIL' }],
}


export { documentTypeOptions, documentTypeRules }