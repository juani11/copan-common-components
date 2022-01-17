import React,{useState} from 'react';
import { Form,Input,Row,Col ,Select} from 'antd';

import "antd/dist/antd.css";


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

export function Document({ 
    documentTypeFormItemName="documentType", 
    documentFormItemName="document" 
}) {
    const [selectedDocumentType, setSelectedDocumentType] = useState('dni');
    const handleChange = value => setSelectedDocumentType(value)

    return (
        <Input.Group>
            <Row>
                <Col xs={6} sm={6} md={8} lg={8}>
                    <Form.Item
                        label="Tipo Doc."
                        name={documentTypeFormItemName}
                        rules={[{ required: true, message: 'Debe ingresar un tipo de documento' }]}
                        initialValue={selectedDocumentType}
                    >
                        <Select data-testid="select" onChange={handleChange}  >
                            {
                                documentTypeOptions.map(opt =>
                                    <Select.Option data-testid="select-option" key={opt.value} value={opt.value}>{opt.name}</Select.Option>
                                )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={18} sm={18} md={14} lg={14}>
                    <Form.Item
                        label=" "
                        name={documentFormItemName}
                        rules={[...documentTypeRules[selectedDocumentType]]}
                    >
                        <Input maxLength={13}/>
                    </Form.Item>
                </Col>
            
            </Row>
        </Input.Group>
    );
}
