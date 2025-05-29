import { flatTrips } from "@/utils/flatmap";
import { useEffect, useState } from "preact/hooks";
function getPeriodRange(year, month) {
    const startDate = new Date(year, month - 1, 11);
    const endDate = new Date(year, month, 10, 23, 59, 59);
    return { startDate, endDate };
}
function getCustomPeriod(pageIndex = 0, startYear = 2025, startMonth = 5) {
    const baseDate = new Date(startYear, startMonth - 1 + pageIndex);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth() + 1;
    return getPeriodRange(year, month);
}
const getPeriodLabel = (page) => {
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth() + page, 11);
    const endMonth = new Date(now.getFullYear(), now.getMonth() + page + 1, 10);
    const format = (d) => d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });
    return `${format(startMonth)} até ${format(endMonth)}`;
};
export const usePagination = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const [periodLabel, setPeriodLabel] = useState(getPeriodLabel(0));
    const updatePeriodLabel = (page) => {
        setPeriodLabel(getPeriodLabel(page));
    };
    const next = () => {
        setCurrentPage((prev) => {
            const newPage = prev + 1;
            updatePeriodLabel(newPage);
            return newPage;
        });
    };
    const previous = () => {
        setCurrentPage((prev) => {
            const newPage = prev - 1;
            updatePeriodLabel(newPage);
            return newPage;
        });
    };
    const fetchData = async () => {
        const { startDate, endDate } = getCustomPeriod(currentPage);
        const response = await fetch(`trips?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
        console.log(response);
        const json = await response.json();
        console.log(json);
        const { trips } = json.data;
        const tripsFlatten = flatTrips(trips);
        setData(() => [...tripsFlatten]);
    };
    useEffect(() => {
        fetchData();
    }, [currentPage]);
    return {
        data,
        previous,
        next,
        refresh: fetchData,
        periodLabel,
    };
};
