import React, { useState } from "react";
import { Form,Button } from "antd";

import { LocalitySearchBar } from "./locality-searchBar";

export const BasicLocalitySearchBar = () => {
    
    const [dataForSelectedLocality, setDataForSelectedLocality] =useState(null);

    return (
        <Form
            name="test LocalitySearchBar component"
            layout="vertical"
            requiredMark={false}
            scrollToFirstError={true}
        >
            <LocalitySearchBar
                dataForSelectedLocality={dataForSelectedLocality}
                setDataForSelectedLocality={setDataForSelectedLocality}
            />
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form>
    );
};
