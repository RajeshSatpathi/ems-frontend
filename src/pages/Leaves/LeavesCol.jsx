export const Leavescolumns = [
    {
        name: 'SL No.',
        selector: (row, index) => index + 1,
        width: '100px',
    },
    {
        name: 'Leaves Type',
        selector: row => row?.leaveType,
        sortable: true,
    },
    {
        name: 'From',
        selector: row => new Date(row.FromDate).toLocaleDateString(),
        sortable: true,
    },
    {
        name: 'Upto',
        selector: row =>new Date(row.ToDate).toLocaleDateString(),
        sortable: true,
    },
    {
        name: 'Description',
        selector: row => row.Description,
        sortable: true,
    },
        {
        name: 'Status',
        selector: row => row.status
,
        sortable: true,
    },

];