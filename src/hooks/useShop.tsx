"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { ExhibitorData } from "@/types";

export const useShop = () => {
    const [data, setData] = useState<any |null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/startup");
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

// Make sure to use this hook only inside a React function component or another custom hook.
