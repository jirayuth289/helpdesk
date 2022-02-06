export const isEmptyValue = (value: any) => {
    if (value === "" || value === null || value === undefined) {
        return true;
    } else {
        return false;
    }
};
