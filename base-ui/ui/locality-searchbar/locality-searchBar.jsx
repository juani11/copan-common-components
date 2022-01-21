import React, { useState } from "react";
import { Form, Input, List, Tag } from "antd";

import getDataFromZipCode from "./locality-searchBar.service";
import { rules } from "./locality-searchBar.rules";

import locale from 'antd/lib/date-picker/locale/es_ES';

import "antd/dist/antd.css";
import "./locality-searchBar.styles.css";


export function LocalitySearchBar({
    formItemName="zipCode", 
    disabled,
    dataForSelectedLocality,
    setDataForSelectedLocality,
}) {
    const [zipCodeSearch, setZipCodeSearch] = useState({
        value: null,
        searching: false,
        result: [],
    });

    const handleChange = (e) => {
        const { value } = e.target;
        setZipCodeSearch({ ...zipCodeSearch, value });
    };

    const handleClickLocality = (selectedItem) => {
        setZipCodeSearch({
            ...zipCodeSearch,
            result: [],
        });

        setDataForSelectedLocality({ ...selectedItem });
    };

    const validateZipCode = (_, value, callback) => {
        if (value.length === 4 && !dataForSelectedLocality) {
            //RegExp
            var result = /^[0-9]*$/.test(value);
            if (!result) {
                return callback();
            }

            setZipCodeSearch({
                ...zipCodeSearch,
                searching: true,
            });

            getDataFromZipCode(value)
                .then((axiosResponse) => {
                    const { Items: items, Count: response_count } =
                        axiosResponse.data;
                    if (response_count > 0) {
                        setZipCodeSearch({
                            ...zipCodeSearch,
                            result: [...items],
                            searching: false,
                        });
                        return callback();
                    } else {
                        setZipCodeSearch({
                            ...zipCodeSearch,
                            result: [],
                            searching: false,
                        });
                        return callback("No se encontró el Código postal");
                    }
                })
                .catch((error) => callback(" Se produjo un error al buscar el Código Postal. Inténtelo nuevamente"));
        } else {
            setZipCodeSearch({
                ...zipCodeSearch,
                result: [],
            });
            value.length != 4 && setDataForSelectedLocality(null);

            return callback();
        }
    };

    return (
        <React.Fragment>
            <Form.Item
                label="Código Postal"
                name={formItemName}
                rules={[
                    ...rules,
                    {
                        validator: validateZipCode,
                    },
                ]}
                extra={
                    dataForSelectedLocality && (
                        <Tag color="geekblue" className="selectedLocality">
                            {`${dataForSelectedLocality.Localidad}, ${dataForSelectedLocality.Provincia}`}
                        </Tag>
                    )
                }
            >
                <Input.Search
                    data-testid="search"
                    placeholder="Ingrese el C.P de la localidad"
                    loading={zipCodeSearch.searching}
                    onChange={handleChange}
                    value={zipCodeSearch.value}
                    allowClear
                    maxLength={4}
                    disabled={disabled}
                />
            </Form.Item>

            {zipCodeSearch.result.length > 0 && (
                <List
                    itemLayout="horizontal"
                    loading={zipCodeSearch.searching}
                    dataSource={zipCodeSearch.result}
                    pagination={{pageSize: 5,total:zipCodeSearch.result.length,size:"small",locale,hideOnSinglePage:true}}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={
                                    <a
                                        onClick={() =>
                                            handleClickLocality(item)
                                        }
                                    >
                                        {item.Localidad}
                                    </a>
                                }
                                description={`${item.Partido}, ${item.Provincia}`}
                            />
                        </List.Item>
                    )}
                />
            )}
        </React.Fragment>
    );
}
