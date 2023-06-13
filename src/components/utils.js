export const formatDate = (input) => {
    const dateObj = new Date(input);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString();
    return `${day}-${month}-${year}`;
};
