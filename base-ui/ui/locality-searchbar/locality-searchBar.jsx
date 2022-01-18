import React, { useState } from "react";
import { Form,Input, List } from "antd";

import getDataFromZipCode from "./locality-searchBar.service";

export function LocalitySearchBar({
    dataForSelectedLocality,
    setDataForSelectedLocality,
}) {
    const [zipCodeSearch, setZipCodeSearch] = useState({
        value: null,
        searching: false,
        result: [],
        error: false,
    });

    const handleChange = (e) => {
        const { value } = e.target;

        if (value.length === 0) {
            setZipCodeSearch({
                ...zipCodeSearch,
                value,
                result: [],
                error: false,
            });
            setDataForSelectedLocality(null);
        } else setZipCodeSearch({ ...zipCodeSearch, value });
    };

    const handleSearch = async (value) => {
        console.log(value);

        if (value.length >= 4) {
            setZipCodeSearch({
                ...zipCodeSearch,
                searching: true,
                error: false,
            });
            var response = await getDataFromZipCode(value);

            console.log("Response desde domicilio service: ", response);

            response.ok
                ? setZipCodeSearch({
                      ...zipCodeSearch,
                      result: [...response.items],
                      searching: false,
                      error: false,
                  })
                : setZipCodeSearch({
                      ...zipCodeSearch,
                      result: [],
                      searching: false,
                      error: true,
                      message: response.message,
                  });
        }
    };

    const handleClickLocality = (selectedItem) => {
        setZipCodeSearch({
            ...zipCodeSearch,
            result: [],
            error: false,
        });

        setDataForSelectedLocality({ ...selectedItem });
    };

    return (
        <div>
            <Form.Item
                label="Código Postal"
                name="zipCode"
                rules={[{ required: true, message: "Debe ingresar un CP" }]}
            >
                <Input.Search
                    data-testid="search"
                    placeholder="Ingrese el CP de la Localidad"
                    onSearch={handleSearch}
                    enterButton
                    loading={zipCodeSearch.searching}
                    onChange={handleChange}
                    value={zipCodeSearch.value}
                />
            </Form.Item>

            {zipCodeSearch.error ? (
                <div>{zipCodeSearch.message}</div>
            ) : (
                zipCodeSearch.result.length > 0 && (
                    <List
                        itemLayout="horizontal"
                        loading={zipCodeSearch.searching}
                        dataSource={zipCodeSearch.result}
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
                                    description={`Partido: ${item.Partido}, Provincia: ${item.Provincia}`}
                                />
                            </List.Item>
                        )}
                    />
                )
            )}

            {dataForSelectedLocality && (
                <p>
                    {dataForSelectedLocality.Provincia +
                        dataForSelectedLocality.Localidad}
                </p>
            )}
        </div>
    );
}
