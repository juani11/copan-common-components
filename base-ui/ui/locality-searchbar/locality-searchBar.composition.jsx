import React, { useState } from "react";
import { LocalitySearchBar } from "./locality-searchBar";

export const BasicLocalitySearchBar = () => {
    const [dataForSelectedLocality, setDataForSelectedLocality] = useState(null);

    return (
        <LocalitySearchBar
            dataForSelectedLocality={dataForSelectedLocality}
            setDataForSelectedLocality={setDataForSelectedLocality}
        />
    );
};
