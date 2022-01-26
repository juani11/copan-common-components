import React,{useState} from 'react';
import { Form,Input,Row,Col ,Select} from 'antd';
import "antd/dist/antd.css";

import { documentTypeOptions, documentTypeRules } from './document.data';


export function Document({ 
    documentTypeFormItemName="documentType", 
    documentFormItemName="document" ,
    disabled=false
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
                        <Select data-testid="select" onChange={handleChange} disabled={disabled} >
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
                        <Input maxLength={13} disabled={disabled}/>
                    </Form.Item>
                </Col>
            
            </Row>
        </Input.Group>
    );
}
