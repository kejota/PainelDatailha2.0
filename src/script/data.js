import moment from "moment";

export const date = () => {
    return moment().format('DD/MM/YYYY');
};