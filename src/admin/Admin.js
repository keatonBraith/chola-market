import React, { useEffect, useState } from "react";
import axios from "axios";
import { getProducts, getOrders } from "../redux/reducer";

const Admin = (props) => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [input, setInput] = useState("");

    return(
        <div>
            <div>
                <h1>Add A Product</h1>
                <div>
                    <input placeholder="title"/>
                    <input placeholder="photo"/>
                    <input placeholder="price"/>
                    <input placeholder="description"/>
                    <input placeholder="ingredients"/>
                    <input placeholder="ingredients"/>
                </div>
            </div>
        </div>
    )
}