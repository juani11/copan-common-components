export const rules = [
    { required: true, message: "Debe ingresar un Código postal" },
    {
        pattern: /^[0-9]*$/,
        message: "Código postal inválido",
    },
    {
        len: 4,
        message: "Debe ingresar 4 dígitos",
        validateTrigger: 'onBlur'
    },

];